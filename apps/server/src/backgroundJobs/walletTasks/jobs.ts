import { v4 as uuidV4 } from 'uuid'
import Settings from '../../models/settings'
import UserWallet, { walletType } from '../../models/userWallets'

export interface WalletJobDataI {
  userId: string
}

export interface SettingJobDataI extends WalletJobDataI {}

const createWalletsJob = async (data: WalletJobDataI) => {
  return await UserWallet.create({
    id: uuidV4(),
    userId: data.userId,
    balance: 0,
    type: walletType.GLOBAL,
  })
}

const createSettingsJob = async (data: SettingJobDataI) => {
  return await Settings.create({
    id: uuidV4(),
    ownerId: data.userId,
  })
}

export { createSettingsJob, createWalletsJob }
