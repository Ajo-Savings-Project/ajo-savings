import GroupMembers from '../../models/groupMembers'
import Groups from '../../models/groups'
import Users from '../../models/users'
import { v4 } from 'uuid'
import nodemailer from 'nodemailer'

interface Props {
  userId: string
  groupId: string
  groupTitle: string
}
export const createNewMember = (props: Props) => {
  return {
    id: v4(),
    userId: props.userId,
    groupId: props.groupId,
    groupTitle: props.groupTitle,
    amountContributed: 0,
    totalAmountWithdrawnByUser: 0,
    dateOfLastContribution: null,
  }
}

async function determineNextBeneficiary(
  userId: string
): Promise<string | null> {
  const nextMember = await GroupMembers.findOne({
    where: {
      userId,
    },
    order: [['sequence', 'ASC']],
  })

  return nextMember ? nextMember.userId : null
}

async function notifyBeneficiary(
  userId: string | null,
  user: Users
): Promise<void> {
  if (userId) {
    console.log(`Notifying beneficiary with userId: ${userId}`)

    // Create a nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
      },
    })

    // Compose the email content
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: user.email,
      subject: 'Cash Out Ready',
      text: `Hi, ${user.firstName} ${user.lastName} \n\nCongratuations! Your cashout is ready \n\n  Please navigate to your account and cashout your funds from your group and get ready for the next contribution if your group will still be active. Thank you and enjoy your funds.`,
    }

    // Send the email
    transporter.sendMail(
      mailOptions,
      (err: Error | null, info: { response: string }) => {
        if (err) {
          console.log(
            `Failed to send cashout email. Please try again later.`,
            err
          )
        } else {
          console.log(
            'Cashout email has been sent to your email if you have an account with us: ' +
              info.response
          )
        }
      }
    )
  } else {
    console.log('No next beneficiary to notify.')
  }
}

export async function triggerNextBeneficiary(userId: string, user: Users) {
  console.log('Triggering next beneficiary...')
  const nextBeneficiary = await determineNextBeneficiary(userId)
  await notifyBeneficiary(nextBeneficiary, user)
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
  frequency: 'daily' | 'weekly' | 'monthly',
  currentDate: Date
): string {
  let dayOfMonth: number
  switch (frequency) {
    case 'daily':
      return '0 0 * * *'
    case 'weekly':
      return '0 0 * * 0'
    case 'monthly':
      dayOfMonth = currentDate.getDate()
      return `0 0 ${dayOfMonth} * *`
    default:
      throw new Error('Invalid frequency')
  }
}
