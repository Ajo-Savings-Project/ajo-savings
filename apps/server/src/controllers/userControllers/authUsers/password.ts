import { Request, Response } from 'express'
import { v4 } from 'uuid'
import { resetPasswordSendEmail } from '../../../backgroundJobs/resetPasswordTask'
import Env from '../../../config/env'
import { HTTP_STATUS_CODE, HTTP_STATUS_HELPER } from '../../../constants'
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
  resetPasswordSchema,
} from '../../../utils/validators'

/**
 * Send a reset password link to the user's email
 */
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

/**
 * Reset user who has forgotten their password
 */
export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { newPassword, token: _token } = req.body

    const dataValid = resetPasswordSchema
      .strict()
      .safeParse({ newPassword, token: _token })

    if (!dataValid.success) {
      return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.BAD_REQUEST](res, {
        message: dataValid.error.issues,
      })
    }

    const resetTokenInstance = await TempTokens.findOne({
      where: { secret: dataValid.data.token, used: false },
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
      return res.status(HTTP_STATUS_CODE.FORBIDDEN).json({
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
