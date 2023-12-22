import Bull from 'bull'
import Env from '../../config/env'

export const signUpSendVerificationEmailQueue = new Bull(
  'SignUp Confirm Email',
  { redis: Env.REDIS }
)

export const resetPasswordSendEmailQueue = new Bull(
  'Reset Password Email',
  { redis: Env.REDIS }
)
