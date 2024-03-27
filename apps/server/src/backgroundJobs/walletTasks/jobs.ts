import { v4 as uuidV4 } from 'uuid'
import Settings from '../../models/settings'
import Wallets, { walletType } from '../../models/wallets'

export interface WalletJobDataI {
  userId: string
}

export interface SettingJobDataI extends WalletJobDataI {}

const createWalletsJob = async (data: WalletJobDataI) => {
  const res = [walletType.GLOBAL, walletType.SAVINGS].map(
    async (type) =>
      await Wallets.create({
        id: uuidV4(),
        userId: data.userId,
        balance: 0,
        type,
      })
  )
  return await Promise.all(res)
}

const createSettingsJob = async (data: SettingJobDataI) => {
  return await Settings.create({
    id: uuidV4(),
    userId: data.userId,
  })
}

export { createSettingsJob, createWalletsJob }
