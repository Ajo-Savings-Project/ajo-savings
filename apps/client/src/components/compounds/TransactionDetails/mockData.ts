
import { faker } from '@faker-js/faker'

export function createRandomUser() {
  return {
    receiver: {
      id: faker.string.uuid(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      avatar: 'https://picsum.photos/200/300.webp?random=idx`',
    },
    type: faker.location.city(),
    date: faker.date
      .between({
        to: new Date(),
        from: new Date().setDate(new Date().getDate() - 10),
      })
      .toISOString(),
    amount: faker.number.int({ min: 3000, max: 500000 }),
    status: faker.helpers.arrayElement(['pending', 'completed', 'failed']),
  }
}

export const transData = Array.from({ length: 10 }, createRandomUser)
