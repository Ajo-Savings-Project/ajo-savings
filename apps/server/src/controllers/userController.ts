import { Request, Response } from 'express'
import { Op } from 'sequelize'
import { v4 as uuidV4 } from 'uuid'
import z from 'zod'
import * as bgJobs from '../backgroundJobs'
import { HTTP_STATUS_CODE } from '../constants/httpStatusCode'
import { GenerateOTP, hashPassword, passwordUtils } from '../utils/helpers'
import Users, { role } from '../models/users'

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
        const hashedPassword = await hashPassword(password)
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
