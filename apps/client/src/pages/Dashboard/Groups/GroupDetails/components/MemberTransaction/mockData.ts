import { faker } from '@faker-js/faker'
import { format } from 'date-fns'

export interface transactions {
  id: number
  avatar: string
  date: string
  time: string
  amount: number | string
  amountColor: string
}

export function createRandomTransact() {
  const isPositive = faker.datatype.boolean()

  let amount: number | string
  let amountColor: string

  if (isPositive) {
    amount = faker.datatype.number({ min: 3000, max: 500000 })
    amountColor = 'green'
  } else {
    amount = -faker.datatype.number({ min: 3000, max: 500000 })
    amountColor = 'red'
  }

  const formattedAmount = isPositive
    ? `+${amount.toLocaleString()}`
    : `${amount.toLocaleString()}`

  const randomDate = faker.date.between(
    new Date().setDate(new Date().getDate() - 10),
    new Date()
  )

  const formattedDate = format(randomDate, 'EEEE, d MMMM, yyyy')
  const formattedTime = format(randomDate, 'hh:mm a')

  return {
    id: faker.datatype.number({ min: 1, max: 50 }),
    avatar: 'https://picsum.photos/200/300.webp?random=idx',
    date: formattedDate,
    time: formattedTime,
    amount: formattedAmount,
    amountColor: amountColor,
  }
}

const transactions = Array.from({ length: 10 }, createRandomTransact)
