import { Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { Op } from 'sequelize'
import { v4 as uuidV4 } from 'uuid'
import z from 'zod'
import * as bgJobs from '../backgroundJobs'
import { HTTP_STATUS_CODE } from '../constants/httpStatusCode'
import { UsersAttributes } from '../types/types'
import { ENV } from '../config/index'
import {
  GenerateOTP,
  PasswordHarsher,
  passwordUtils,
  GenerateToken,
} from '../utils/helpers'
import Users, { role } from '../models/users'
import { loginSchema } from '../utils/validators/index'

const validateUserSchema = z.object({
  firstName: z.string().min(2, 'firstname is required'),
  lastName: z.string().min(2, 'lastname is required'),
  email: z.string().email({ message: 'email is invalid' }),
  // TODO: improve phone number validation
  phone: z.string().min(11, 'phone number is required'),
  password: z.string().min(7, passwordUtils.error),
})

export const registerUser = async (req: Request, res: Response) => {
  const passwordRegex = passwordUtils.regex

  try {
    const { firstName, lastName, email, phone, password } = req.body

    const userValidate = validateUserSchema.strict().safeParse(req.body)

    const newEmail = email.trim().toLowerCase()

    if (userValidate.success) {
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
    //validate the body of the request
    const validationResult = loginSchema.safeParse(req.body)
    if (!validationResult.success) {
      return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
        message: validationResult.error.issues,
      })
    }
    const { email, password } = req.body
    //find user by email
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
          email: confirmUser.email,
        }
        //generate access token
        const accessToken = GenerateToken(payload, { expiresIn: '15m' })

        //generate refresh token
        const refreshToken = GenerateToken(payload, { expiresIn: '7d' })

        //set access token as HTTP-only cookie
        res.cookie('accessToken', accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
        })

        // Set refresh token as HTTP-only cookie
        res.cookie('refreshToken', refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
        })

        // Return basic user data to client-side
        return res.status(HTTP_STATUS_CODE.SUCCESS).json({
          message: [`Login Successful`],
          user: {
            email: confirmUser.email,
            firstName: confirmUser.firstName,
            lastName: confirmUser.lastName,
          },
        })
      }
    }
    return res.status(HTTP_STATUS_CODE.UNAUTHORIZED).send({
      message: 'Invalid Credentials!',
    })
  } catch (error) {
    console.log(error)
    return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER).json({
      message: [`This is our fault, our team are working to resolve this.`],
    })
  }
}

export const tokenRefresher = async (req: JwtPayload, res: Response) => {
  try {
    const { refreshToken } = req

    // Check if APP_SECRET is defined
    if (!ENV.APP_SECRET) {
      return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER).json({
        message: ['Internal Server Error: APP_SECRET is undefined'],
      })
    }

    // Verify refresh token
    const decodedToken = jwt.verify(refreshToken, ENV.APP_SECRET)

    // Check if the decoded token is a valid object
    if (typeof decodedToken !== 'object' || decodedToken === null) {
      return res.status(403).json({ message: 'Invalid refresh token' })
    }

    const user: UsersAttributes = decodedToken as UsersAttributes

    // Generate a new access token
    const accessToken = GenerateToken(
      { id: user.id, email: user.email },
      { expiresIn: '15m' }
    )

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    })

    res.status(HTTP_STATUS_CODE.SUCCESS).json({
      message: [`Access token successfully refreshed!`],
    })
  } catch (error) {
    console.log(error)
    return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER).json({
      message: ['Internal Server Error'],
    })
  }
}
