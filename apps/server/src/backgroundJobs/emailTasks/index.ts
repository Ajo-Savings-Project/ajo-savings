import { mailResetPassword } from './jobs/resetPasswordJob'
import { signupVerificationMail } from './jobs/signupVerifyJob'
import {
  resetPasswordSendEmailQueue,
  sendExpiredVerificationEmailQueue,
  signUpSendVerificationEmailQueue,
} from './queues'

//  consumer/worker
signUpSendVerificationEmailQueue.process((job) => {
  return signupVerificationMail(job.data)
})

export const signUpSendVerificationEmail = (values: {
  email: string
  token: string
  firstName: string
}) => {
  // producer
  signUpSendVerificationEmailQueue.add(values)
}

//  consumer/worker
sendExpiredVerificationEmailQueue.process((job) => {
  return sendExpiredVerificationEmail(job.data)
})

export const sendExpiredVerificationEmail = (values: {
  email: string
  firstName: string
}) => {
  // producer
  sendExpiredVerificationEmailQueue.add(values)
}

//  consumer/worker
resetPasswordSendEmailQueue.process((job) => {
  return mailResetPassword(job.data)
})

export const resetPasswordSendEmail = (values: {
  email: string
  firstName: string
  message: string
}) => {
  // producer
  resetPasswordSendEmailQueue.add(values)
}
