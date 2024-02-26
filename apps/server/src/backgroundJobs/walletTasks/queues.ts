import Bull from 'bull'
import Env from '../../config/env'

export const setupWalletsQueue = new Bull('Setup User Wallet', {
  redis: Env.REDIS,
})

export const setupSettingQueue = new Bull('Setup Settings', {
  redis: Env.REDIS,
})
