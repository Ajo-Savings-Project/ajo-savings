import { pipe } from 'rambda'
import { formatCurrency } from '../../../utils/currencyFormatter.ts'
import { format } from 'date-fns'
export interface TransactionResponseI {
  receiver: {
    id: string
    firstName: string
    name?: string
    lastName: string
    avatar: string
  }
  type: string
  date: string
  amount: number | string
  status: string
}

export const getDate = (date: string) => date.split('T')[0]

const getDateLabel = (date: string) => {
  const currentDate = new Date()
  const isToday = getDate(currentDate.toISOString()) === date

  const yesterday = new Date(currentDate)
  yesterday.setDate(currentDate.getDate() - 1)
  const isYesterday = getDate(yesterday.toISOString()) === date

  if (isToday) return 'Today'
  else if (isYesterday) return 'Yesterday'
  return date
}

const updateValues = (transactions: TransactionResponseI[]) => {
  return transactions.map((transaction) => {
    return {
      ...transaction,
      receiver: {
        ...transaction.receiver,
        name: `${transaction.receiver.firstName} ${transaction.receiver.lastName}`,
      },
      amount: formatCurrency(+transaction.amount),
    }
  })
}

const sortTransactions = (transactions: TransactionResponseI[]) => {
  return transactions.sort((a, b) => {
    const dateA = new Date(a.date).getTime()
    const dateB = new Date(b.date).getTime()
    return dateB - dateA
  })
}

const groupTransactions = (transactions: TransactionResponseI[]) => {
  return transactions.reduce(
    (acc: Record<string, TransactionResponseI[]>, cur) => {
      const date = getDate(cur.date)
      acc[date] = acc[date] ? [...acc[date], cur] : [cur]
      return acc
    },
    {}
  )
}

const labelTransactions = (
  transactions: Record<string, TransactionResponseI[]>
) => {
  return Object.entries(transactions).reduce(
    (acc: Record<string, TransactionResponseI[]>, [k, v]) => {
      const key = getDateLabel(k)
      acc[key] = v
      return acc
    },
    {}
  )
}
// Formating time and date with date-fn library

export const getFormattedDate = (data: string) => {
  return format(data, ' dd/MM/yyyy')
}
export const getFormattedTime = (data: string) => {
  return format(data, ' hh:mm:ss a')
}

export const mockTransactions = (data: TransactionResponseI[]) =>
  pipe(
    updateValues,
    sortTransactions,
    groupTransactions,
    labelTransactions
  )(data)
