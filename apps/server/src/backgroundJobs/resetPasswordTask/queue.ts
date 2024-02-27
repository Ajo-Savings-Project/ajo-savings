import Bull from 'bull'
import Env from '../../config/env'

export const resetPasswordSendEmailQueue = new Bull('Reset Password Email', {
  redis: Env.REDIS,
})
