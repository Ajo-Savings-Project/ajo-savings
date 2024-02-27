import { MailSignupT, mailSignUpVerify } from './job'
import { signUpSendVerificationEmailQueue } from './queue'

signUpSendVerificationEmailQueue.process((job) => {
  return mailSignUpVerify(job.data)
})

export const sendSignupVerificationEmailJob = (values: MailSignupT) => {
  // producer
  signUpSendVerificationEmailQueue.add(values)
}
