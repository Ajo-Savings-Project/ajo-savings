import { mailOTP } from './jobs/signupVerifyJob'
import { signUpSendVerificationEmailQueue } from './queues'

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
