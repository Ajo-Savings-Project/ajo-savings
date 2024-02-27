import { resetPasswordSendEmailQueue } from './queue'
import { mailResetPassword } from './job'

resetPasswordSendEmailQueue.process((job) => {
  return mailResetPassword(job.data)
})

export const resetPasswordSendEmail = (values: {
  email: string
  firstName: string
  token: string
}) => {
  // producer
  resetPasswordSendEmailQueue.add(values)
}
