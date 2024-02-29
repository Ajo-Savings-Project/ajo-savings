import { pipe } from 'rambda'

export interface GroupResponseI {
  avatar: string
  id: number
  name: string
  performance: number | string
}
const updateValues = (transactions: GroupResponseI[]) => {
  return transactions.map((transaction) => {
    return {
      ...transaction,

      performance:
        typeof transaction.performance === 'number'
          ? `${transaction.performance}%`
          : transaction.performance,
    }
  })
}

export const mockTransactions = (data: GroupResponseI[]) =>
  pipe(updateValues)(data)
