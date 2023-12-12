import Bull from 'bull'
import { redisOptions } from '../../app'
import { emailProcess, walletProcess } from './worker'
import { MailOTPJobData, WalletJobData } from './jobs'

const emailQueue = new Bull('emailQ', {
  redis: redisOptions,
})

emailQueue.process(emailProcess)
export const sendNewMail = (data: MailOTPJobData) => {
  emailQueue.add(data, {})
}
emailQueue.on('failed', (job) => {
  console.log(`job failed with Error: ${job.failedReason}`)
})

const walletQueue = new Bull('walletQ', {
  redis: redisOptions,
})

walletQueue.process(walletProcess)
export const createWallets = (data: WalletJobData) => {
  walletQueue.add(data, {})
}

walletQueue.on('failed', (job) => {
  console.log(`job failed with Error: ${job.failedReason}`)
})

export { emailQueue, walletQueue }
