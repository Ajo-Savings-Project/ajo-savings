import { v4 as uuidV4 } from 'uuid'
import Settings from '../../models/settings'
import Wallets, { WalletType } from '../../models/wallets'

export interface WalletJobData {
  userId: string
}

const createGlobalWalletJob = async (data: WalletJobData) => {
  const globalWalletId = uuidV4()
  const newGlobalWallet = await Wallets.create({
    id: globalWalletId,
    userId: data.userId,
    totalAmount: 500000,
    type: WalletType.GLOBAL,
    totalIncome: 0,
    earnings: [],
  })

  return await Wallets.findOne({
    where: { id: newGlobalWallet.id },
  })
}

const createPersonalSavingsWalletJob = async (data: WalletJobData) => {
  const savingsWalletId = uuidV4()
  const newSavingsWallet = await Wallets.create({
    id: savingsWalletId,
    userId: data.userId,
    totalAmount: 0,
    type: WalletType.SAVINGS,
    totalIncome: 0,
    earnings: [],
  })
  return await Wallets.findOne({
    where: { id: newSavingsWallet.id },
  })
}

const createPersonalGroupWalletJob = async (data: WalletJobData) => {
  const personalGroupWalletId = uuidV4()
  const personalGroupWallet = await Wallets.create({
    id: personalGroupWalletId,
    userId: data.userId,
    totalAmount: 0,
    type: WalletType.GROUP_WALLET,
    totalIncome: 0,
    earnings: [],
  })
  return await Wallets.findOne({
    where: { id: personalGroupWallet.id },
  })
}

const createSettingsJob = async (data: WalletJobData) => {
  return await Settings.create({
    id: uuidV4(),
    owner_id: data.userId,
  })
}

export {
  createGlobalWalletJob,
  createPersonalSavingsWalletJob,
  createPersonalGroupWalletJob,
  createSettingsJob,
}
