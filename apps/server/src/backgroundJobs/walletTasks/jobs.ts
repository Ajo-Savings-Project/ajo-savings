import { v4 as uuidV4 } from 'uuid'
import Settings, { SettingsAttribute } from '../../models/settings'
import Wallets, { type, WalletAttributes } from '../../models/wallets'

export interface WalletJobData {
  userId: string
}

const createGlobalWalletJob = async (data: WalletJobData) => {
  const globalWalletId = uuidV4()
  const newGlobalWallet = (await Wallets.create({
    id: globalWalletId,
    user_id: data.userId,
    total_amount: 500000,
    type: type.GLOBAL,
    total_income: 0,
    earnings: [],
    created_at: new Date(),
  })) as unknown as WalletAttributes

  return (await Wallets.findOne({
    where: { id: newGlobalWallet.id },
  })) as unknown as WalletAttributes
}

const createPersonalSavingsWalletJob = async (data: WalletJobData) => {
  const savingsWalletId = uuidV4()
  const newSavingsWallet = (await Wallets.create({
    id: savingsWalletId,
    user_id: data.userId,
    total_amount: 0,
    type: type.SAVINGS,
    total_income: 0,
    earnings: [],
    created_at: new Date(),
  })) as unknown as WalletAttributes
  return (await Wallets.findOne({
    where: { id: newSavingsWallet.id },
  })) as unknown as WalletAttributes
}

const createPersonalGroupWalletJob = async (data: WalletJobData) => {
  const personalGroupWalletId = uuidV4()
  const personalGroupWallet = (await Wallets.create({
    id: personalGroupWalletId,
    user_id: data.userId,
    total_amount: 0,
    type: type.GROUP_WALLET,
    total_income: 0,
    earnings: [],
    created_at: new Date(),
  })) as unknown as WalletAttributes
  return (await Wallets.findOne({
    where: { id: personalGroupWallet.id },
  })) as unknown as WalletAttributes
}

const createSettingsJob = async (data: WalletJobData) => {
  return (await Settings.create({
    id: uuidV4(),
    owner_id: data.userId,
  })) as unknown as SettingsAttribute
}

export {
  createGlobalWalletJob,
  createPersonalSavingsWalletJob,
  createPersonalGroupWalletJob,
  createSettingsJob,
}
