import {
  createSettingsJob,
  createWalletsJob,
} from '../backgroundJobs/walletTasks/jobs'
import { db } from '../config'
import Users from '../models/users'
import { userSeedCreateGroup, userSeedPlaceholder } from './data-placeholders'

async function seedUsers(size: number) {
  try {
    const newUsers = await Promise.all(
      Array.from({ length: size }, async () => {
        const user = await userSeedPlaceholder()

        const createdUser = await Users.create(user)
        await createWalletsJob({ userId: user.id })
        await createSettingsJob({ userId: user.id })
        return createdUser
      })
    )
    console.log(`Created ${newUsers.length} users`)
    return newUsers
  } catch (e) {
    console.error(
      'An error occurred while attempting to seed user database:',
      e
    )
    return []
  }
}

async function seedGroups(users: Users[], size: number) {
  const { groupsTotal, usersTotal } = await userSeedCreateGroup(users, size)
  console.log(
    `Associated ${usersTotal} users with groups\n Total groups created: ${groupsTotal}`
  )
}

async function main() {
  await db.sync({ force: true })
  const createdUsers = await seedUsers(20)
  await seedGroups(createdUsers, 3)
}

main().catch((err) => {
  console.error('An error occurred while attempting to seed the database:', err)
})
