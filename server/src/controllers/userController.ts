import { Request, Response } from 'express'
import { Op } from 'sequelize'
import { v4 } from 'uuid'
import Users, { role } from '../models/users'
import {
  GenerateOTP,
  GenerateToken,
  hashPassword,
  passwordUtils,
} from '../utils/helpers'
import { validateUserSchema } from '../utils/validation'

// const sendMail = (email: string, otp: string) => mailOTP(email, otp)

export const registerUser = async (req: Request, res: Response) => {
  const passwordRegex = passwordUtils.regex

  try {
    const { firstName, lastName, email, phone, password } = req.body
    const userValidate = validateUserSchema.safeParse(req.body)

    const newEmail = email.trim().toLowerCase()

    if (userValidate.success) {
      if (!passwordRegex.test(password)) {
        return res.status(400).json({
          status: 'error',
          message: passwordUtils.error,
        })
      }

      const userExist = await Users.findOne({
        where: {
          [Op.or]: [{ email: newEmail }, { phone: phone }],
        },
      })

      if (!userExist) {
        const hashedPassword = await hashPassword(password)
        const otpInfo = GenerateOTP()
        const otp = otpInfo.otp.toString()
        const id = v4()

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
        })

        const token = await GenerateToken({
          id: user.id,
          email: user.email,
        })

        // backgroundJobToCompleteRegistration(user, otp)

        return res.status(200).json({
          message: `Registration Successful`,
          user: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
          },
          refreshToken: token,
        })
      } else {
        return res.status(409).send({
          status: 'error',
          message: 'This account already exist',
        })
      }
    }
    return res.status(400).send({
      status: 'error',
      message: userValidate.error.issues,
    })
  } catch (error) {
    return res.status(500).json({
      message: `This is our fault, our team are working to resolve this.`,
    })
  }
}
