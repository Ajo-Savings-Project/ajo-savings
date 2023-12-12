import Bull from 'bull'
import Env from '../../config/env'

export const setupGlobalWalletQueue = new Bull('Setup Global Wallet', {
  redis: Env.REDIS,
})
export const setupPersonalSavingsWalletQueue = new Bull(
  'Setup Personal Savings Wallet',
  { redis: Env.REDIS }
)
export const setupPersonalGroupWalletQueue = new Bull(
  'Setup Personal Group Wallet',
  {
    redis: Env.REDIS,
  }
)
export const setupSettingQueue = new Bull('Setup Settings', {
  redis: Env.REDIS,
})
