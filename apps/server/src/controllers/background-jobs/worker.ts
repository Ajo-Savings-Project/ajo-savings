import { Job } from 'bull'
import {
  mailOTPJob,
  createGlobalWalletJob,
  createPersonalGroupWalletJob,
  createPersonalSavingsWalletJob,
  createSettingsJob,
} from './jobs'

export const emailProcess = async (job: Job) => {
  mailOTPJob(job.data)
}

export const walletProcess = async (job: Job) => {
  console.log('wallet created', job.data.userId)
  return (
    createGlobalWalletJob(job.data),
    createPersonalSavingsWalletJob(job.data),
    createPersonalGroupWalletJob(job.data),
    createSettingsJob(job.data)
  )
}
