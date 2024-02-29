import { faker } from '@faker-js/faker'

export interface Transaction {
  id: number
  avatar: string
  name: string
  performance: number | string
  serialNumber: number
}

export function createRandomTransact(_: unknown, index: number): Transaction {
  const serialNumber = index + 1

  const showPercentage = faker.datatype.boolean()
  let performance: number | string

  if (showPercentage) {
    performance = faker.datatype.number({ min: 0, max: 100 })
  } else {
    performance = 'new User'
  }

  return {
    id: faker.datatype.number({ min: 1, max: 50 }),
    avatar: `https://picsum.photos/200/300.webp?random=${faker.datatype.number()}`,
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    performance: performance,
    serialNumber: serialNumber,
  }
}

export const transData = Array.from({ length: 5 }, createRandomTransact)

export const ViewData = [
  {
    label: 'Contribution Amount',
    value: '₦ 500,000',
  },
  {
    label: 'Schedule',
    value: 'Daily',
  },
  {
    label: 'Contribution Timeline',
    value: '5 months',
  },
  {
    label: 'Estimated Collection',
    value: '₦ 2,000,000',
  },
  {
    label: 'Start Date',
    value: 'May 1, 2022',
  },
  {
    label: 'End Date',
    value: 'October 1, 2022',
  },
  {
    label: 'Available Slots',
    value: '2 and 6',
  },
  {
    label: 'Total Slots',
    value: '6',
  },
]
