import { v4 as uuidV4 } from 'uuid'
import Settings from '../../models/settings'
import Wallets, { walletType, ownerType } from '../../models/wallets'
import Earnings from '../../models/walletEarnings'

export interface WalletJobData {
  userId: string
}

const createGlobalWalletJob = async (data: WalletJobData) => {
  const globalWalletId = uuidV4()
  const newGlobalWallet = await Wallets.create({
    id: globalWalletId,
    ownerId: data.userId,
    ownerType: ownerType.USER,
    balance: 500000,
    type: walletType.GLOBAL,
  })

  await Earnings.create({
    walletId: newGlobalWallet.id,
    amount: 0,
    date: new Date().toISOString(),
  })

  return await Wallets.findOne({
    where: { id: newGlobalWallet.id },
  })
}

const createPersonalSavingsWalletJob = async (data: WalletJobData) => {
  const savingsWalletId = uuidV4()
  const newSavingsWallet = await Wallets.create({
    id: savingsWalletId,
    ownerId: data.userId,
    ownerType: ownerType.USER,
    balance: 0,
    type: walletType.SAVINGS,
  })

  await Earnings.create({
    walletId: newSavingsWallet.id,
    amount: 0,
    date: new Date().toISOString(),
  })

  return await Wallets.findOne({
    where: { id: newSavingsWallet.id },
  })
}

const createPersonalGroupWalletJob = async (data: WalletJobData) => {
  const personalGroupWalletId = uuidV4()
  const personalGroupWallet = await Wallets.create({
    id: personalGroupWalletId,
    ownerId: data.userId,
    ownerType: ownerType.USER,
    balance: 0,
    type: walletType.GROUP_WALLET,
  })

  await Earnings.create({
    walletId: personalGroupWallet.id,
    amount: 0,
    date: new Date().toISOString(),
  })

  return await Wallets.findOne({
    where: { id: personalGroupWallet.id },
  })
}

const createSettingsJob = async (data: WalletJobData) => {
  return await Settings.create({
    id: uuidV4(),
    ownerId: data.userId,
  })
}

export {
  createGlobalWalletJob,
  createPersonalSavingsWalletJob,
  createPersonalGroupWalletJob,
  createSettingsJob,
}
