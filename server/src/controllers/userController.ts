import { Request, Response } from 'express'
import { v4 } from 'uuid'
import { validateUserSchema } from '../utils/validation'
import {
  GenerateOTP,
  GenerateToken,
  hashPassword,
  passwordUtils,
} from '../utils/helpers'
import Users, { UserAttributes, role } from '../models/users'
import { mailOTP } from '../utils/mailFunctions'
import Wallets, { WalletAttributes, type } from '../models/wallets'
import Settings, { SettingsAttribute } from '../models/settings'

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, phone, password, confirm_password } =
      req.body

    const error = validateUserSchema.safeParse(req.body)
    if (error.success === false) {
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
    if (password !== confirm_password)
      return res.status(400).json({
        status: 'error',
        message: `Password mismatch`,
      })
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
    mailOTP(email, otp)
    const payload = {
      id: user.id,
      email: user.email,
    }
    const token = await GenerateToken(payload)

    // Create global wallet
    const globalWalletId = v4()
    const newGlobalWallet = (await Wallets.create({
      id: globalWalletId,
      user_id: user.id,
      total_amount: 500000,
      type: type.GLOBAL,
      total_income: 0,
      earnings: [],
      created_at: new Date(),
    })) as unknown as WalletAttributes
    const wallet = (await Wallets.findOne({
      where: { id: newGlobalWallet.id },
    })) as unknown as WalletAttributes

    // Create savings wallet
    const savingsWalletId = v4()
    const newSavingsWallet = (await Wallets.create({
      id: savingsWalletId,
      user_id: user.id,
      total_amount: 0,
      type: type.SAVINGS,
      total_income: 0,
      earnings: [],
      created_at: new Date(),
    })) as unknown as WalletAttributes
    const savingsWallet = (await Wallets.findOne({
      where: { id: newSavingsWallet.id },
    })) as unknown as WalletAttributes

    // Create group wallet
    const personalGroupWalletId = v4()
    const newpersonalGroupWallet = (await Wallets.create({
      id: personalGroupWalletId,
      user_id: user.id,
      total_amount: 1000,
      type: type.GROUP_WALLET,
      total_income: 0,
      earnings: [],
      created_at: new Date(),
    })) as unknown as WalletAttributes
    const personalGroupWallet = (await Wallets.findOne({
      where: { id: newpersonalGroupWallet.id },
    })) as unknown as WalletAttributes

    if (!wallet || !savingsWallet || !personalGroupWallet) {
      await Users.destroy({ where: { id: user.id } })
      return res.status(400).json({
        message: `Unable to register User`,
      })
    }

    // Create settings for the user
    ;(await Settings.create({
      id: v4(),
      owner_id: user.id,
    })) as unknown as SettingsAttribute

    return res.status(200).json({
      message: `Registration Successful`,
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
      globalWallet: 'global wallet created successfully',
      groupWallet: 'personal group wallet created successfully',
      savingsWallet: 'personal savings wallet created successfully',
      token,
    })
  } catch (error) {
    return res.status(500).json({
      message: `Internal Server Error`,
      Error: error,
    })
  }
}
