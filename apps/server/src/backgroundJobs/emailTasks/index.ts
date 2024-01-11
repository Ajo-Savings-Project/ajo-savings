import { mailResetPassword } from './jobs/resetPasswordJob'
import { mailOTP } from './jobs/signupVerifyJob'
import {
  resetPasswordSendEmailQueue,
  signUpSendVerificationEmailQueue,
} from './queues'

//  consumer/worker
signUpSendVerificationEmailQueue.process((job) => {
  return mailOTP(job.data)
})

export const signUpSendVerificationEmail = (values: {
  email: string
  otp: string
  firstName: string
}) => {
  // producer
  signUpSendVerificationEmailQueue.add(values)
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
