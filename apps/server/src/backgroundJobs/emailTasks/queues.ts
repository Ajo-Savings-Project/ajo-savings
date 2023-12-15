import Bull from 'bull'
import Env from '../../config/env'

export const redisOptions = { host: 'localhost', port: 6379 }

export const signUpSendVerificationEmailQueue = new Bull(
  'SignUp Confirm Email',
  { redis: Env.REDIS }
)
