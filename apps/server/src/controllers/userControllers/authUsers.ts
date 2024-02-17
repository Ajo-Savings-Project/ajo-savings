import { Request, Response } from 'express'
import _ from 'lodash'
import { Op } from 'sequelize'
import { v4 as uuidV4 } from 'uuid'
import * as bgJobs from '../../backgroundJobs'
import Env from '../../config/env'
import {
  HTTP_STATUS_CODE,
  HTTP_STATUS_HELPER,
  JWT_ACCESS_TOKEN_EXPIRATION_TIME,
  JWT_INVALID_STATUS_CODE,
  JWT_REFRESH_TOKEN_EXPIRATION_TIME,
  REFRESH_TOKEN,
} from '../../constants'
import Users, { authMethod, role } from '../../models/users'
import UserResetPasswordToken from '../../models/userPasswordToken'
import { RequestExt } from '../../middleware/authorization/authentication'
import {
  GenerateOTP,
  Jwt,
  PasswordHarsher,
  passwordUtils,
  generateLongString,
} from '../../utils/helpers'
import {
  forgotPasswordSchema,
  loginSchema,
  refreshTokenSchema,
  registerSchema,
  changePasswordSchema,
} from '../../utils/validators'

export const registerUser = async (req: Request, res: Response) => {
  const passwordRegex = passwordUtils.regex

  try {
    const userValidate = registerSchema.strict().safeParse(req.body)

    if (!userValidate.success) {
      // TODO: send to error logger - userValidate.error.issues
      return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.BAD_REQUEST](res, {
        message: userValidate.error.issues,
      })
    }

    const { firstName, lastName, email, phone, password } = userValidate.data

    const newEmail = email.trim().toLowerCase()

    if (!passwordRegex.test(password)) {
      return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
        message: passwordUtils.error,
      })
    }

    //TODO: Validate 9ja phone number
    const userExist = await Users.findOne({
      where: {
        [Op.or]: [{ email: newEmail }, { phone: phone }],
      },
    })

    if (!userExist) {
      const hashedPassword = await PasswordHarsher.hash(password)
      const otpInfo = GenerateOTP()
      const otp = otpInfo.otp.toString()
      const id = uuidV4()

      const user = await Users.create({
        id,
        firstName: firstName.toLowerCase().trim(),
        lastName: lastName.toLowerCase().trim(),
        email: newEmail,
        phone: phone.trim(),
        password: hashedPassword,
        role: role.CONTRIBUTOR,
        authMethod: authMethod.BASIC,
        emailIsVerified: false,
        kycComplete: false,
      })

      bgJobs.signUpSendVerificationEmail({
        email,
        otp,
        firstName: user.firstName,
      })
      bgJobs.setupGlobalWallet({ userId: user.id })
      bgJobs.setupPersonalGroupWallet({ userId: user.id })
      bgJobs.setupPersonalSavingsWallet({ userId: user.id })
      bgJobs.setupSettings({ userId: user.id })

      return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.SUCCESS](res, {
        user: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
      })
    } else {
      return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.CONFLICT](res, {
        message: 'This account already exist',
      })
    }
  } catch (error) {
    return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.INTERNAL_SERVER](res)
  }
}

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

      const user = await Users.findOne({ where: { email } })

      if (user) {
        const { otp, expiry: tokenExpiry } = GenerateOTP()
        const longString = generateLongString(80) //generate 80 chars long random string
        const secret = generateLongString(20) //generate 20 chars long random string
        const expiresIn = 300 // seconds

        // create unique verify token
        const token = await Jwt.sign(
          {
            id: user.id,
            otp: otp.toString(),
            tokenExpiry: tokenExpiry.getTime().toString(),
          },
          { _secret: Env.JWT_SECRET + longString, expiresIn }
        )

        //create password reset data instance
        await UserResetPasswordToken.create({
          id: longString,
          secret,
          token,
          used: false,
        })

        const link = `${Env.FE_BASE_URL}/auth/reset-password?verify=${longString}`

        bgJobs.resetPasswordSendEmail({
          firstName: user.firstName,
          email: email,
          message: link,
        })
      }

      return res.status(HTTP_STATUS_CODE.SUCCESS).json({
        message: `Password reset link will be sent to your email if you have an account with us.`,
      })
    }

    return res.status(HTTP_STATUS_CODE.BAD_REQUEST).send({
      message: isValidBody.error.issues,
    })
  } catch (error) {
    console.log(error)

    // TODO: send to error logger - error
    return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER).json({
      message: [
        { message: `This is our fault, our team are working to resolve this.` },
      ],
    })
  }
}

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { verify: longString } = req.query

    const { newPassword } = req.body

    if (!newPassword || !passwordUtils.regex.test(newPassword)) {
      return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
        message: passwordUtils.error,
      })
    }

    // Check for reset-token instance using query-string(id)
    const resetTokenInstance = await UserResetPasswordToken.findOne({
      where: { id: longString as string, used: false },
    })

    if (!resetTokenInstance) {
      return res.status(HTTP_STATUS_CODE.UNAUTHORIZED).json({
        message: 'Invalid or already used verification token.',
      })
    }

    const { id, token } = resetTokenInstance

    /**
     * References JWT secret in forgotPassword function
     * @see forgotPassword
     **/
    const tokenStatus = await Jwt.isTokenExpired(token, Env.JWT_SECRET + id)

    if (!tokenStatus.valid || tokenStatus.expired) {
      return res.status(HTTP_STATUS_CODE.UNAUTHORIZED).json({
        message: 'Invalid or expired reset password token.',
      })
    }

    const decodedToken = tokenStatus.data

    const hashedPassword = await PasswordHarsher.hash(newPassword)

    const user = await Users.update(
      { password: hashedPassword },
      { where: { id: decodedToken.id }, returning: true }
    )

    // Invalidate the reset token after it's used
    await resetTokenInstance.update({ used: true })

    return res.status(HTTP_STATUS_CODE.SUCCESS).json({
      message:
        'Password reset successful. You can now log in with your new password.',
      email: user[1][0].email,
    })
  } catch (error) {
    console.log('new error', error)
    return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER).json({
      message: 'This is our fault, our team is working to resolve this.',
    })
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

    return res.status(HTTP_STATUS_CODE.SUCCESS).json({
      message: 'Password updated successfully',
    })
  } catch (error) {
    console.log(error)
    return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER).json({
      message: `Internal Server Error`,
    })
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
