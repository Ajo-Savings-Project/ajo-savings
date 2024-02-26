import { ExpressAdapter } from '@bull-board/express'
import { createBullBoard } from '@bull-board/api'
import { BullAdapter } from '@bull-board/api/bullAdapter'
import { signUpSendVerificationEmailQueue } from '../backgroundJobs/emailTasks/queues'
import { setupSettingQueue } from '../backgroundJobs/walletTasks/queues'

export const serverAdapter = new ExpressAdapter()
serverAdapter.setBasePath('/admin/queues')

createBullBoard({
  queues: [
    new BullAdapter(signUpSendVerificationEmailQueue),
    new BullAdapter(setupSettingQueue),
  ],
  serverAdapter: serverAdapter,
})
