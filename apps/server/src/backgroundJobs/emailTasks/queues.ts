import Bull from 'bull'
import Env from '../../config/env'

export const signUpSendVerificationEmailQueue = new Bull(
  'SignUp Confirm Email',
  { redis: Env.REDIS }
)
