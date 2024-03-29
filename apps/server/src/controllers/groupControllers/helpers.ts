import GroupMembers from '../../models/groupMembers'
import Groups from '../../models/groups'
import Users from '../../models/users'
import { v4 } from 'uuid'
import { createEmail } from '../../utils/createEmailFactory'
export const getUserWithId = async (userId: string) => {
  return await Users.findOne({
    where: { id: userId },
  })
}

interface Props {
  userId: string
  groupId: string
  groupTitle: string
  options?: Partial<{
    isAdmin: boolean
  }>
}

let sequence
const MAX_SEQUENCE_VALUE = 1000000

export const createNewMember = async (props: Props) => {
  const user = await getUserWithId(props.userId)

  if (user) {
    if (props.options?.isAdmin) {
      sequence = MAX_SEQUENCE_VALUE
    } else {
      const members = await GroupMembers.findAll({
        where: {
          groupId: props.groupId,
        },
      })

      sequence =
        members.length === 1 && members[0].isAdmin
          ? 1
          : members[members.length - 1].sequence + 1
    }

    return {
      id: v4(),
      userId: props.userId,
      groupId: props.groupId,
      groupTitle: props.groupTitle,
      amountContributed: 0,
      totalAmountWithdrawnByUser: 0,
      dateOfLastContribution: null,
      isAdmin: props.options?.isAdmin || false,
      sequence: sequence,
    }
  }
  return null
}

export async function triggerNextBeneficiary(userId: string, user: Users) {
  const nextBeneficiary = await GroupMembers.findOne({
    where: {
      userId,
    },
    order: [['sequence', 'ASC']],
    include: [
      {
        model: Users,
        as: 'user',
      },
    ],
  })

  if (nextBeneficiary) {
    console.log(`Notifying ${nextBeneficiary.userId}`)

    // send notification email
    const path = './cashoutTemplate.html'

    const { sendMail } = await createEmail({
      to: user.email,
      subject: 'Cash Out Ready',
      templatePath: path,
      templateContext: {
        firstName: user.firstName,
        lastName: user.lastName,
      },
    })

    await sendMail()
  } else {
    console.log('No next beneficiary')
  }
}

export async function createNextCycle(newGroup: { id: string }) {
  try {
    console.log('Creating next cycle...')
    // Retrieve the current group
    const currentGroup = await Groups.findByPk(newGroup.id)
    if (!currentGroup) {
      throw new Error('Group not found')
    }

    // Reset contribution counters
    currentGroup.amountContributedWithinFrequency = 0
    currentGroup.totalAmountWithdrawn = 0

    // Save the updated group
    await currentGroup.save()

    console.log('Next cycle created successfully.')
  } catch (error) {
    console.error('Error creating next cycle:', error)
  }
}

export function getCronExpressionFromFrequency(
  frequency: 'DAILY' | 'WEEKLY' | 'MONTHLY',
  currentDate: Date
): string {
  let dayOfMonth: number
  switch (frequency) {
    case 'DAILY':
      return '0 0 * * *'
    case 'WEEKLY':
      return '0 0 * * 0'
    case 'MONTHLY':
      dayOfMonth = currentDate.getDate()
      return `0 0 ${dayOfMonth} * *`
    default:
      throw new Error('Invalid frequency')
  }
}
