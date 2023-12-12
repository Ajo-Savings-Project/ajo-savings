import { mailOTP } from './jobs/signupVerifyJob'
import { signUpSendVerificationEmailQueue } from './queues'

export const signUpSendVerificationEmail = (values: {
  email: string
  otp: string
  firstName: string
}) => {
  // consumer/worker
  signUpSendVerificationEmailQueue.process((job) => {
    return mailOTP(job.data)
  })
  // producer
  signUpSendVerificationEmailQueue.add(values)
}
