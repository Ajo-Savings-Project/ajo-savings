import { faker } from '@faker-js/faker'
import { v4 as uuidV4 } from 'uuid'
import { createNewMember } from '../controllers/groupControllers/helpers'
import GroupMembers from '../models/groupMembers'
import Groups, { frequencyType } from '../models/groups'
import GroupWallet from '../models/groupWallet'
import Users, { authMethod, identificationTypes, role } from '../models/users'
import { generateLongString, PasswordHarsher } from '../utils/helpers'

export const userSeedPlaceholder = async () => {
  const kycComplete = faker.helpers.arrayElement([true, false])
  const pdf =
    'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'

  const hashedPassword = await PasswordHarsher.hash('password')

  return {
    id: uuidV4(),
    firstName: faker.person.firstName(),
    lastName: faker.person.firstName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    password: hashedPassword,
    profilePic: faker.image.avatar(),
    gender: faker.person.sex(),
    role: role.CONTRIBUTOR,
    dateOfBirth: faker.date.past({ years: 50 }),
    address: faker.location.streetAddress(),
    occupation: faker.person.jobTitle(),
    bvn: generateLongString(11),
    identificationNumber: faker.finance.routingNumber(),
    identificationDoc: kycComplete ? pdf : '',
    proofOfAddressDoc: kycComplete ? pdf : '',
    identificationType: faker.helpers.arrayElement(
      Object.values(identificationTypes)
    ),
    authMethod: authMethod.BASIC,
    emailIsVerified: faker.helpers.arrayElement([true, false]),
    kycComplete,
  }
}

export const userSeedCreateGroup = async (users: Users[], maxGroup = 9) => {
  let totalCreatedGroup = 0
  const randomSelectedUsers = [
    ...new Set(
      Array.from({ length: users.length - 1 }, (_, i) => i + 1).sort(
        () => Math.random() - 0.5
      )
    ),
  ].slice(0, faker.helpers.rangeToNumber({ min: 10, max: 20 }))

  randomSelectedUsers.map(async (userPosition) => {
    const user = users[userPosition]
    const randomGroupAmount = faker.helpers.rangeToNumber({
      min: 1,
      max: maxGroup,
    })
    totalCreatedGroup += randomGroupAmount

    return await Promise.all(
      Array.from({ length: randomGroupAmount }).map(async () => {
        const groupId = uuidV4()

        const newGroup = {
          id: groupId,
          title: faker.commerce.productName(),
          description: faker.commerce.productDescription(),
          ownerId: user.id,
          recurringAmount: Math.round(
            faker.helpers.rangeToNumber({
              min: 10000,
              max: 100000,
            })
          ),
          groupImage: `https://picsum.photos/200/300?random=${user.id}`,
          amountContributedWithinFrequency: 0,
          totalAmountWithdrawn: 0,
          availableNumberOfParticipants: 1,
          maxNumberOfParticipants: faker.helpers.rangeToNumber({
            min: 10,
            max: 30,
          }),
          frequency: faker.helpers.arrayElement(Object.values(frequencyType)),
          duration: '',
        }

        await Groups.create(newGroup)

        // associate the user to the group
        await GroupMembers.create(createNewMember({ groupId, userId: user.id }))

        await GroupWallet.create({
          id: uuidV4(),
          balance: 0,
          ownerId: groupId,
        })

        return groupId
      })
    )
  })

  return {
    usersTotal: randomSelectedUsers.length,
    groupsTotal: totalCreatedGroup,
  }
}
