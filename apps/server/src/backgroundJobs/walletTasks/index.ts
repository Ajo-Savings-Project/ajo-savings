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

export const setupSettings = (values: { userId: string }) => {
  setupSettingQueue.process((job) => {
    return createSettingsJob(job.data)
  })
  setupSettingQueue.add(values)
}

export const setupPersonalSavingsWallet = (values: { userId: string }) => {
  setupPersonalSavingsWalletQueue.process((job) => {
    return createPersonalSavingsWalletJob(job.data)
  })
  setupPersonalSavingsWalletQueue.add(values)
}

export const setupPersonalGroupWallet = (values: { userId: string }) => {
  setupPersonalGroupWalletQueue.process((job) => {
    return createPersonalGroupWalletJob(job.data)
  })
  setupPersonalGroupWalletQueue.add(values)
}

export const setupGlobalWallet = (values: { userId: string }) => {
  setupGlobalWalletQueue.process((job) => {
    return createGlobalWalletJob(job.data)
  })
  setupGlobalWalletQueue.add(values)
}
