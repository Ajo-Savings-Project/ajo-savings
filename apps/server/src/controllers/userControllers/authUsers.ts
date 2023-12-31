import { Request, Response } from 'express'
import { Op } from 'sequelize'
import { v4 as uuidV4 } from 'uuid'
import * as bgJobs from '../../backgroundJobs'
import Env from "../../config/env";
import {
  HTTP_STATUS_CODE,
  JWT_ACCESS_TOKEN_EXPIRATION_TIME,
  JWT_INVALID_STATUS_CODE,
  JWT_REFRESH_TOKEN_EXPIRATION_TIME,
  REFRESH_TOKEN,
} from '../../constants'
import Users, { role } from '../../models/users'
import UserResetPasswordToken from '../../models/userPasswordToken'
import {
  GenerateOTP,
  Jwt,
  PasswordHarsher,
  passwordUtils,
  generateLongString
} from '../../utils/helpers'
import {
  forgotPasswordSchema,
  loginSchema,
  refreshTokenSchema,
  registerSchema,
} from '../../utils/validators'

export const registerUser = async (req: Request, res: Response) => {
  const passwordRegex = passwordUtils.regex

  try {
    const userValidate = registerSchema.strict().safeParse(req.body)

    if (userValidate.success) {
      const { firstName, lastName, email, phone, password } = userValidate.data

      const newEmail = email.trim().toLowerCase()

      if (!passwordRegex.test(password)) {
        return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
          message: passwordUtils.error,
        })
      }

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
          firstName,
          lastName,
          email: newEmail,
          phone,
          password: hashedPassword,
          profilePic: '',
          role: role.CONTRIBUTOR,
          otp,
          otp_expiry: otpInfo.expiry,
          gender: '',
          occupation: '',
          bvn: '',
          address: '',
          identification_number: '',
          identification_doc: '',
          proof_of_address_doc: '',
          isVerified: false,
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

        return res.status(HTTP_STATUS_CODE.SUCCESS).json({
          message: `Registration Successful`,
          user: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
          },
        })
      } else {
        return res.status(HTTP_STATUS_CODE.CONFLICT).send({
          message: 'This account already exist',
        })
      }
    }

    // TODO: send to error logger - userValidate.error.issues
    return res.status(HTTP_STATUS_CODE.BAD_REQUEST).send({
      message: userValidate.error.issues,
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

        // Return basic user data to client-side
        return res.status(HTTP_STATUS_CODE.SUCCESS).json({
          message: [`Login Successful`],
          user: {
            id: confirmUser.id,
            email: confirmUser.email,
            firstName: confirmUser.firstName,
            lastName: confirmUser.lastName,
          },
          token: accessToken,
        })
      }
    }
    return res.status(HTTP_STATUS_CODE.UNAUTHORIZED).send({
      message: 'Invalid Credentials!',
    })
  } catch (error) {
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

        // create unique verify token
        const token = await Jwt.sign({
          otp: otp.toString(),
          tokenExpiry: tokenExpiry.getTime().toString(),
        })

        //create password reset data instance
        await UserResetPasswordToken.create({
          id: longString,
          token,
        })

        const link = `${Env.FE_BASE_URL}/auth/reset-password?verify=${longString}`

        bgJobs.resetPasswordSendEmail({
          firstName: user.firstName,
          email: email,
          message: link,
        })

        return res.status(HTTP_STATUS_CODE.SUCCESS).json({
          message: `Password reset link will be sent to your email if you have an account with us.`,
        })
      }
      return res.status(HTTP_STATUS_CODE.NOT_FOUND).json({
        message: `Account not found`,
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
