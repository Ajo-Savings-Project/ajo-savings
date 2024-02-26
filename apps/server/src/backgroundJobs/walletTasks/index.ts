import { createSettingsJob, createWalletsJob } from './jobs'
import { setupSettingQueue, setupWalletsQueue } from './queues'

// Settings
setupSettingQueue.process((job) => {
  return createSettingsJob(job.data)
})
export const setupSettings = (values: { userId: string }) => {
  setupSettingQueue.add(values)
}

// Wallet
setupWalletsQueue.process((job) => {
  return createWalletsJob(job.data)
})

export const setupWallets = (values: { userId: string }) => {
  setupWalletsQueue.add(values)
}
