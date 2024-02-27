import { ExpressAdapter } from '@bull-board/express'
import { createBullBoard } from '@bull-board/api'
import { BullAdapter } from '@bull-board/api/bullAdapter'
import { resetPasswordSendEmailQueue } from '../backgroundJobs/resetPasswordTask/queue'
import { signUpSendVerificationEmailQueue } from '../backgroundJobs/signupVerifyTask/queue'
import {
  setupSettingQueue,
  setupWalletsQueue,
} from '../backgroundJobs/walletTasks/queues'

export const serverAdapter = new ExpressAdapter()
serverAdapter.setBasePath('/admin/queues')

createBullBoard({
  serverAdapter: serverAdapter,
  queues: [
    new BullAdapter(resetPasswordSendEmailQueue),
    new BullAdapter(signUpSendVerificationEmailQueue),
    new BullAdapter(setupWalletsQueue),
    new BullAdapter(setupSettingQueue),
  ],
})
