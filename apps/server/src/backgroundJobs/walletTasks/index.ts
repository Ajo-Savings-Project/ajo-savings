import {
  createGlobalWalletJob,
  createPersonalSavingsWalletJob,
  createPersonalGroupWalletJob,
  createSettingsJob,
} from './jobs'
import {
  setupGlobalWalletQueue,
  setupPersonalGroupWalletQueue,
  setupPersonalSavingsWalletQueue,
  setupSettingQueue,
} from './queues'

setupSettingQueue.process((job) => {
  return createSettingsJob(job.data)
})
export const setupSettings = (values: { userId: string }) => {
  setupSettingQueue.add(values)
}

setupPersonalSavingsWalletQueue.process((job) => {
  return createPersonalSavingsWalletJob(job.data)
})
export const setupPersonalSavingsWallet = (values: { userId: string }) => {
  setupPersonalSavingsWalletQueue.add(values)
}

setupPersonalGroupWalletQueue.process((job) => {
  return createPersonalGroupWalletJob(job.data)
})
export const setupPersonalGroupWallet = (values: { userId: string }) => {
  setupPersonalGroupWalletQueue.add(values)
}

setupGlobalWalletQueue.process((job) => {
  return createGlobalWalletJob(job.data)
})
export const setupGlobalWallet = (values: { userId: string }) => {
  setupGlobalWalletQueue.add(values)
}
