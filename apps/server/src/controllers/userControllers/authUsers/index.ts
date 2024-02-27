import { Request, Response } from 'express'
import _ from 'lodash'
import { v4 } from 'uuid'
import { resetPasswordSendEmail } from '../../../backgroundJobs/resetPasswordTask'
import Env from '../../../config/env'
import {
  HTTP_STATUS_CODE,
  HTTP_STATUS_HELPER,
  JWT_ACCESS_TOKEN_EXPIRATION_TIME,
  JWT_INVALID_STATUS_CODE,
  JWT_REFRESH_TOKEN_EXPIRATION_TIME,
  REFRESH_TOKEN,
} from '../../../constants'
import { RequestExt } from '../../../middleware/authorization/authentication'
import TempTokens from '../../../models/userPasswordToken'
import Users from '../../../models/users'
import {
  generateLongString,
  Jwt,
  PasswordHarsher,
  passwordUtils,
} from '../../../utils/helpers'
import {
  changePasswordSchema,
  forgotPasswordSchema,
  loginSchema,
  refreshTokenSchema,
  resetPasswordSchema,
} from '../../../utils/validators'

export const loginUser = async (req: Request, res: Response) => {
  try {
    const validationResult = loginSchema.strict().safeParse(req.body)

    if (!validationResult.success) {
      return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
        message: validationResult.error.issues,
      })
    }

    const { email, password } = validationResult.data

    const confirmUser = await Users.findOne({
      where: { email: email },
    })

    if (confirmUser) {
      const confirmPassword = await PasswordHarsher.compare(
        password,
        confirmUser.password
      )

      if (confirmPassword) {
        // TODO: once verify email is implemented, we can check if the user is verified

        // const isVerified = confirmUser.isVerified
        //
        // if (!isVerified) {
        //   return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.UNAUTHORIZED](
        //     res,
        //     'Account not verified, please check your email for the verification link'
        //   )
        // }

        const payload = {
          id: confirmUser.id,
        }

        const accessToken = await Jwt.sign(payload, {
          expiresIn: JWT_ACCESS_TOKEN_EXPIRATION_TIME,
        })

        const refreshToken = await Jwt.sign(payload, {
          expiresIn: JWT_REFRESH_TOKEN_EXPIRATION_TIME,
          _secret: Env.JWT_REFRESH_SECRET,
        })

        res.cookie(REFRESH_TOKEN, refreshToken, {
          httpOnly: true,
          sameSite: 'strict',
          secure: Env.IS_PROD,
        })

        return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.SUCCESS](res, {
          message: [`Login Successful`],
          user: _.pick(confirmUser.dataValues, [
            'id',
            'email',
            'firstName',
            'lastName',
            'kycComplete',
          ]),
          token: accessToken,
        })
      }
    }

    return res.status(HTTP_STATUS_CODE.UNAUTHORIZED).send({
      message: 'Invalid Credentials!',
    })
  } catch (error) {
    console.log('error', error)

    return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER).json({
      message: [`This is our fault, our team are working to resolve this.`],
    })
  }
}

//TODO: we have to keep track of tokens and implement revocation - redis will store our tokens
export const refreshToken = async (req: Request, res: Response) => {
  try {
    const isValidObj = refreshTokenSchema.strict().safeParse(req.body)

    if (!isValidObj.success) {
      return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER).send({
        message: 'This is our fault, our engineers have been notified.',
      })
    }

    const oldAccessToken = req.headers?.authorization?.split(' ')[1] as string

    const { valid, data } = await Jwt.isTokenExpired<Users>(oldAccessToken)

    if (valid) {
      const payload = { id: data.id }
      /**
       * TODO: Rotation and Revocation:
       * Implement token rotation, where each time a refresh token is used,
       * it is replaced with a new one, and the old one is invalidated.
       */
      const refreshToken = await Jwt.sign(payload, {
        expiresIn: JWT_REFRESH_TOKEN_EXPIRATION_TIME,
        _secret: Env.JWT_REFRESH_SECRET,
      })

      const accessToken = await Jwt.sign(payload, {
        expiresIn: JWT_ACCESS_TOKEN_EXPIRATION_TIME,
      })

      res.cookie(REFRESH_TOKEN, refreshToken, {
        httpOnly: true,
        sameSite: 'strict',
        secure: Env.IS_PROD,
      })

      return res.status(HTTP_STATUS_CODE.SUCCESS).json({
        message: ['Success'],
        token: accessToken,
      })
    }
  } catch (error) {
    console.log('error', error)

    return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER).send({
      conde: JWT_INVALID_STATUS_CODE,
      message: 'Something has gone wrong.',
    })
  }
}

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const isValidBody = forgotPasswordSchema.strict().safeParse(req.body)

    if (isValidBody.success) {
      let { email } = isValidBody.data

      email = email.trim().toLowerCase()

      const user = await Users.findOne({
        where: { email },
        attributes: ['id', 'firstName', 'lastName', 'email'],
      })

      if (user) {
        const secret = generateLongString(25)

        const token = await Jwt.sign(
          {
            id: user.id,
            type: 'reset-password',
          },
          { _secret: Env.JWT_SECRET + secret, expiresIn: '1m' }
        )

        //create password reset data instance
        await TempTokens.create({
          id: v4(),
          secret,
          token,
          used: false,
        })

        resetPasswordSendEmail({
          ...user.dataValues,
          token: secret,
        })
      }

      return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.SUCCESS](res, {
        message: `Password reset link will be sent to your email if you have an account with us.`,
      })
    }

    return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.BAD_REQUEST](res, {
      message: isValidBody.error.issues,
    })
  } catch (error) {
    return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.INTERNAL_SERVER](res)
  }
}

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { newPassword, verify: secret } = req.body

    const dataValid = resetPasswordSchema
      .strict()
      .safeParse({ newPassword, secret })

    if (!dataValid.success) {
      return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.BAD_REQUEST](res, {
        message: dataValid.error.issues,
      })
    }

    const resetTokenInstance = await TempTokens.findOne({
      where: { secret: dataValid.data.secret, used: false },
    })

    if (!resetTokenInstance) {
      return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.UNAUTHORIZED](res)
    }

    const { secret: _secret, token } = resetTokenInstance

    /**
     * References JWT secret in forgotPassword function
     * @see forgotPassword
     **/
    const decodedJwt = await Jwt.isTokenExpired(token, Env.JWT_SECRET + _secret)

    if (!decodedJwt.valid || decodedJwt.expired) {
      return res.status(HTTP_STATUS_CODE.UNAUTHORIZED).json({
        message: 'Invalid or expired reset password token.',
      })
    }

    const hashedPassword = await PasswordHarsher.hash(
      dataValid.data.newPassword
    )

    const user = await Users.update(
      { password: hashedPassword },
      { where: { id: decodedJwt.data.id }, returning: true }
    )

    // Invalidate the reset token after it's used
    await resetTokenInstance.update({ used: true })

    return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.SUCCESS](res, {
      message:
        'Password reset successful. You can now log in with your new password.',
      email: user[1][0].email,
    })
  } catch (error) {
    return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.INTERNAL_SERVER](res)
  }
}

/**
 * Already logged-in user that wishes to change their password
 * @param {RequestExt} req
 * @param {e.Response} res
 */
export const changePassword = async (req: RequestExt, res: Response) => {
  const passwordRegex = passwordUtils.regex

  try {
    const { _user: user, ...rest } = req.body

    const validationResult = changePasswordSchema.safeParse(rest)

    if (!validationResult.success) {
      return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
        message: validationResult.error.issues,
      })
    }

    const reqObject = validationResult.data

    if (!passwordRegex.test(reqObject.newPassword)) {
      return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
        message: passwordUtils.error,
      })
    }

    const confirmOldPasswordMatch = await PasswordHarsher.compare(
      reqObject.oldPassword,
      user.password
    )

    if (!confirmOldPasswordMatch) {
      return res.status(HTTP_STATUS_CODE.UNAUTHORIZED).json({
        message: 'Old password does not match.',
      })
    }

    const hashedPassword = await PasswordHarsher.hash(reqObject.newPassword)

    await user.update({ password: hashedPassword })

    return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.SUCCESS](res)
  } catch (error) {
    return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.INTERNAL_SERVER](res)
  }
}

// TODO: verify email

/**
 *   /users/verify-email
 *
 *   Interface:
 *   message: z.string(),
 *   status: 'success' | 'expired' | 'error',
 *   user: RegisterSchema - send back form fields except confirmPassword and password
 */
