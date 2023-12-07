import { ExpressAdapter } from '@bull-board/express'
import { createBullBoard } from '@bull-board/api'
import { BullAdapter } from '@bull-board/api/bullAdapter'
import { emailQueue, walletQueue } from './queue'

export const serverAdapter = new ExpressAdapter()
serverAdapter.setBasePath('/admin/queues')

const { addQueue, removeQueue, setQueues, replaceQueues } = createBullBoard({
  queues: [new BullAdapter(emailQueue), new BullAdapter(walletQueue)],
  serverAdapter: serverAdapter,
})

export { addQueue, removeQueue, setQueues, replaceQueues }
