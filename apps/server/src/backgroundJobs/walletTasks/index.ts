import {
  createSettingsJob,
  createWalletsJob,
  SettingJobDataI,
  WalletJobDataI,
} from './jobs'
import { setupSettingQueue, setupWalletsQueue } from './queues'

// Settings
setupSettingQueue.process((job) => {
  return createSettingsJob(job.data)
})
export const setupSettings = (values: SettingJobDataI) => {
  setupSettingQueue.add(values)
}

// Wallet
setupWalletsQueue.process((job) => {
  return createWalletsJob(job.data)
})

export const setupWallets = (values: WalletJobDataI) => {
  setupWalletsQueue.add(values)
}
