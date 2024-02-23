import { Response } from 'express'
import _ from 'lodash'
import { RequestExt } from '../../middleware/authorization/authentication'
import { HTTP_STATUS_CODE, HTTP_STATUS_HELPER } from '../../constants'
import { v4 } from 'uuid'
import Groups, { FrequencyType } from '../../models/groups'
import GroupMembers from '../../models/groupMembers'
import GroupTransactions from '../../models/groupTransactions'
import GroupContributors from '../../models/contributorsInGroup'
import Wallets from '../../models/wallets'
import { transactionType } from '../../models/transactions'
import { createGroupSchema } from '../../utils/validators'
import { v2 as cloudinary } from 'cloudinary'
import { createNewMember } from './helpers'
import nodemailer from 'nodemailer'
import { addMilliseconds, format } from 'date-fns'
import User from '../../models/users'

async function notifyBeneficiary(
  userId: string | null,
  user: User
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

async function triggerNextBeneficiary(userId: string, user: User) {
  console.log('Triggering next beneficiary...')
  const nextBeneficiary = await determineNextBeneficiary(userId)
  await notifyBeneficiary(nextBeneficiary, user)
}

async function createNextCycle(newGroup: { id: string }) {
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
    // return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.INTERNAL_SERVER](res, {
    //   message: 'Error creating next cycle',
    //   error: error,
    // })
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

function calculateFrequencyDuration(
  maxParticipants: number,
  frequency: 'daily' | 'weekly' | 'monthly'
): number {
  // Convert frequency to milliseconds
  let frequencyInMilliseconds
  switch (frequency) {
    case 'daily':
      frequencyInMilliseconds = 24 * 60 * 60 * 1000
      break
    case 'weekly':
      frequencyInMilliseconds = 7 * 24 * 60 * 60 * 1000
      break
    case 'monthly':
      frequencyInMilliseconds = 28 * 24 * 60 * 60 * 1000
      break
    default:
      throw new Error('Invalid frequency')
  }

  // Calculate cycle duration based on the number of participants
  const cycleDuration = maxParticipants * frequencyInMilliseconds

  return cycleDuration
}

export const createGroup = async (req: RequestExt, res: Response) => {
  const { _user: user, _userId: userId, ...rest } = req.body

  const requestData = createGroupSchema
    .strict()
    .safeParse(_.omit(rest, ['_user']))

  if (!requestData.success) {
    return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.BAD_REQUEST](res, {
      message: requestData.error.issues,
    })
  }

  const _data = requestData.data

  const groupId = v4()

  try {
    const adminMember = await createNewMember({
      userId,
      adminId: userId,
      options: { isAdmin: true },
    })

    if (!adminMember) {
      return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.FORBIDDEN](res, {})
    }

    await GroupMembers.create(adminMember)

    // Move the upload operation to background task
    let groupImage = 'https://picsum.photos/200/300'
    if (req.file) {
      // Upload image to Cloudinary
      // use groupId to find and update groupImage
      const result = await cloudinary.uploader.upload(
        req.file.buffer.toString('base64')
      )
      groupImage = result.secure_url
    }

    const newGroup = {
      id: groupId,
      title: _data.groupName,
      description: _data.purposeAndGoals,
      adminId: userId,
      recurringAmount: _data.recurringAmount,
      groupImage: groupImage,
      amountContributedWithinFrequency: 0,
      totalAmountWithdrawn: 0,
      availableNumberOfParticipants: 1,
      maxNumberOfParticipants: _data.maxNumberOfParticipants,
      frequency: _data.frequency as FrequencyType,
      automaticRestartCycle: _data.automaticRestartCycle,
    }

    const frequencyDuration = calculateFrequencyDuration(
      _data.maxNumberOfParticipants,
      _data.frequency
    )

    const formattedDate = format(
      addMilliseconds(new Date(), frequencyDuration),
      "yyyy-MM-dd'T'HH:mm:ss"
    )

    const automaticRestartCycleEnabled = newGroup.automaticRestartCycle || false

    setTimeout(async () => {
      try {
        await triggerNextBeneficiary(userId, user)
        if (automaticRestartCycleEnabled) {
          await createNextCycle(newGroup)
        }
      } catch (error) {
        return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.INTERNAL_SERVER](res, {
          message: 'Error during contribution cycle:',
          error,
        })
      }
    }, frequencyDuration)

    const createdGroup = await Groups.create(newGroup)

    const groupTransactions = {
      id: v4(),
      groupId: createdGroup.id,
      amount: 0,
      transactionType: transactionType.GROUP_TRANSACTIONS,
      dateInitiated: new Date().toISOString(),
    }

    await GroupTransactions.create(groupTransactions)

    const groupContributor = {
      contributorsId: v4(),
      groupId: createdGroup.id,
    }

    await GroupContributors.create(groupContributor)

    const groupWallet = await Wallets.create({
      id: v4(),
      ownerId: groupId,
      ownerType: 'group',
      balance: 0,
      type: 'group',
    })

    return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.SUCCESS](res, {
      message: 'Group created successfully',
      group: createdGroup,
      wallet: groupWallet,
      duration: `Next cashout scheduled for: ${formattedDate}`,
    })
  } catch (error) {
    console.log(error)
    await Wallets.destroy({ where: { ownerId: groupId } })
    await Groups.destroy({ where: { id: groupId } })
    await GroupMembers.destroy({ where: { adminId: userId } })
    await GroupTransactions.destroy({ where: { groupId: groupId } })
    await GroupContributors.destroy({ where: { groupId: groupId } })
    return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.INTERNAL_SERVER](res, error)
  }
}
