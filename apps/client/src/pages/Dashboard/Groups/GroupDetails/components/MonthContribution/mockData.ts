import { format } from 'date-fns'
import { formatCurrency } from 'utils/currencyFormatter'
import { faker } from '@faker-js/faker'

export interface Contribute {
  date: string
  month: string
  amount: number | string
}

export function createRandomContribute(): Contribute {
  const randomDate = faker.date.recent()
  const randomAmount = faker.finance.amount()
  return {
    date: format(randomDate, 'MMMM d, yyyy'),
    month: format(randomDate, 'MMMM'),
    amount: formatCurrency(parseFloat(randomAmount)),
  }
}
export const transData = Array.from({ length: 10 }, createRandomContribute)
