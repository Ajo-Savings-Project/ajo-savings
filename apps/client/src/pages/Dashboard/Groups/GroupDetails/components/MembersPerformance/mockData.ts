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

  return {
    id: faker.datatype.number({ min: 1, max: 50 }),
    avatar: `https://picsum.photos/200/300.webp?random=${serialNumber}`,
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    performance: showPercentage
      ? faker.datatype.number({ min: 0, max: 100 })
      : 'new user',
    serialNumber,
  }
}

export const mockTransData = Array.from({ length: 5 }, createRandomTransact)
