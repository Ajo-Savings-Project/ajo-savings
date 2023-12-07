import { Request, Response } from 'express'
import { v4 } from 'uuid'
import { validateUserSchema } from '../utils/validation'
import { GenerateOTP, hashPassword, passwordUtils } from '../utils/helpers'
import Users, { UserAttributes, role } from '../models/users'
import { sendNewMail, createWallets } from './background-jobs/queue'

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, phone, password } = req.body

    const error = validateUserSchema.safeParse(req.body)
    if (!error.success) {
      return res.status(400).send({
        status: 'error',
        method: req.method,
        message: error.error.issues,
      })
    }
    const passwordRegex = passwordUtils.regex
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        status: 'error',
        message: passwordUtils.error,
      })
    }

    const newEmail = email.trim().toLowerCase()

    const userExist = await Users.findOne({ where: { email: newEmail } })
    if (userExist) {
      return res.status(400).json({
        status: 'error',
        message: `${newEmail} is already in use`,
      })
    }
    const phoneExist = await Users.findOne({ where: { phone: phone } })
    if (phoneExist) {
      return res.status(400).json({
        status: 'error',
        message: `${phone} is already in use`,
      })
    }
    const hashedPassword = await hashPassword(password)
    const otpInfo = GenerateOTP()
    const otp = otpInfo.otp.toString()
    const id = v4()

    const user = (await Users.create({
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
      createdAt: new Date(),
      updatedAt: new Date(),
    })) as unknown as UserAttributes

    if (!user) {
      return res.status(400).json({
        message: `User registration failed`,
      })
    }

    // mailOTP
    sendNewMail({ email, otp })

    // Create wallets & settings
    createWallets({ userId: user.id })

    return res.status(200).json({
      message: `Registration Successful`,
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    })
  } catch (error) {
    return res.status(500).json({
      message: `Internal Server Error`,
      Error: error,
    })
  }
}
