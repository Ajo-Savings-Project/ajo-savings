import { v4 as uuidV4 } from 'uuid'
import Settings from '../../models/settings'
import Wallets, { walletType } from '../../models/wallets'

export interface WalletJobData {
  userId: string
}

const createWalletsJob = async (data: WalletJobData) => {
  const res = [walletType.GLOBAL, walletType.SAVINGS].map(
    async (type) =>
      await Wallets.create({
        id: uuidV4(),
        ownerId: data.userId,
        balance: 0,
        type,
      })
  )

  return await Promise.all(res).then((wallets) => wallets[0].id)
}

const createSettingsJob = async (data: WalletJobData) => {
  return await Settings.create({
    id: uuidV4(),
    ownerId: data.userId,
  })
}

export { createSettingsJob, createWalletsJob }
