import { mailOTP } from '../../utils/mailFunctions'
import Wallets, { WalletAttributes, type } from '../../models/wallets'
import Settings, { SettingsAttribute } from '../../models/settings'
import { v4 } from 'uuid'

export interface MailOTPJobData {
  email: string
  otp: string
}

export interface WalletJobData {
  userId: string
}

const mailOTPJob = async ({ email, otp }: MailOTPJobData) => {
  mailOTP(email, otp)
}

const createGlobalWalletJob = async (data: WalletJobData) => {
  const globalWalletId = v4()
  const newGlobalWallet = (await Wallets.create({
    id: globalWalletId,
    user_id: data.userId,
    total_amount: 500000,
    type: type.GLOBAL,
    total_income: 0,
    earnings: [],
    created_at: new Date(),
  })) as unknown as WalletAttributes

  const globalWallet = (await Wallets.findOne({
    where: { id: newGlobalWallet.id },
  })) as unknown as WalletAttributes
  return globalWallet
}

const createPersonalSavingsWalletJob = async (data: WalletJobData) => {
  const savingsWalletId = v4()
  const newSavingsWallet = (await Wallets.create({
    id: savingsWalletId,
    user_id: data.userId,
    total_amount: 0,
    type: type.SAVINGS,
    total_income: 0,
    earnings: [],
    created_at: new Date(),
  })) as unknown as WalletAttributes
  const savingsWallet = (await Wallets.findOne({
    where: { id: newSavingsWallet.id },
  })) as unknown as WalletAttributes

  return savingsWallet
}

const createPersonalGroupWalletJob = async (data: WalletJobData) => {
  const personalGroupWalletId = v4()
  const newpersonalGroupWallet = (await Wallets.create({
    id: personalGroupWalletId,
    user_id: data.userId,
    total_amount: 1000,
    type: type.GROUP_WALLET,
    total_income: 0,
    earnings: [],
    created_at: new Date(),
  })) as unknown as WalletAttributes
  const personalGroupWallet = (await Wallets.findOne({
    where: { id: newpersonalGroupWallet.id },
  })) as unknown as WalletAttributes
  return personalGroupWallet
}

const createSettingsJob = async (data: WalletJobData) => {
  const settings = (await Settings.create({
    id: v4(),
    owner_id: data.userId,
  })) as unknown as SettingsAttribute
  return settings
}

export {
  mailOTPJob,
  createGlobalWalletJob,
  createPersonalSavingsWalletJob,
  createPersonalGroupWalletJob,
  createSettingsJob,
}
