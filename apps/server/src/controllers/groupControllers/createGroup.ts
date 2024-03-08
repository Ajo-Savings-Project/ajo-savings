import { v2 as cloudinary } from 'cloudinary'
import { Response } from 'express'
import { v4 } from 'uuid'
import { HTTP_STATUS_CODE, HTTP_STATUS_HELPER } from '../../constants'
import { RequestExt } from '../../middleware/authorization/authentication'
import GroupMembers from '../../models/groupMembers'
import Groups, { FrequencyType } from '../../models/groups'
import GroupWallet from '../../models/groupWallet'
import { createGroupSchema } from '../../utils/validators'
import { createNewMember } from './helpers'
import { Duration, add, format } from 'date-fns'
import {
  createNextCycle,
  triggerNextBeneficiary,
  getCronExpressionFromFrequency,
} from './helpers'
import cron from 'node-cron'
import { transactionWalletType } from '../../models/transactions'

const handleCreateGroupError = async (groupId: string): Promise<void> => {
  await GroupWallet.destroy({ where: { groupId: groupId } })
  await Groups.destroy({ where: { id: groupId } })
  await GroupMembers.destroy({ where: { groupId } })
}

export const createGroup = async (req: RequestExt, res: Response) => {
  const { _user: user, _userId: userId, ...rest } = req.body

  const requestData = createGroupSchema.strict().safeParse(rest)

  if (!requestData.success) {
    return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.BAD_REQUEST](res, {
      message: requestData.error.issues,
    })
  }

  const _data = requestData.data

  const groupId = v4()

  try {
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

    const groupName = _data.groupName

    const existingGroup = await Groups.findOne({ where: { title: groupName } })

    if (existingGroup) {
      return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.BAD_REQUEST](res, {
        error: 'Group with this name already exists',
      })
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
      numberOfPresentParticipants: 1,
      maxNumberOfParticipants: _data.maxNumberOfParticipants,
      frequency: _data.frequency as FrequencyType,
      automaticRestartCycle: _data.automaticRestartCycle,
    }

    const currentDate = new Date()
    let nextCashoutDate: Date

    switch (_data.frequency) {
      case 'DAILY':
        nextCashoutDate = add(currentDate, { days: 1 } as Duration)
        break
      case 'WEEKLY':
        nextCashoutDate = add(currentDate, { weeks: 1 } as Duration)
        break
      case 'MONTHLY':
        nextCashoutDate = add(currentDate, { months: 1 } as Duration)
        break
      default:
        throw new Error('Invalid frequency')
    }

    const formattedDate = format(nextCashoutDate, 'yyyy-MM-dd')

    const automaticRestartCycleEnabled = newGroup.automaticRestartCycle || false

    const cronExpression = getCronExpressionFromFrequency(
      _data.frequency,
      new Date()
    )
    const cronDate = cron.schedule(cronExpression, async () => {
      try {
        await triggerNextBeneficiary(userId, user)
        if (automaticRestartCycleEnabled) {
          await createNextCycle(newGroup)
        }
      } catch (error) {
        console.error('Error during contribution cycle:', error)
      }
    })

    cronDate.start()
    const createdGroup = await Groups.create(newGroup)

    // Combine database children operations into a transaction
    if (Groups.sequelize) {
      await Groups.sequelize.transaction(async (transaction) => {
        await GroupWallet.create(
          {
            id: v4(),
            groupId: newGroup.id,
            balance: 0,
            type: transactionWalletType.GROUP,
          },
          { transaction }
        )

        // Create new member only if user exists
        const newMemberData = await createNewMember({
          userId,
          groupId: newGroup.id,
          groupTitle: _data.groupName,
          options: { isAdmin: true },
        })

        if (newMemberData) {
          await GroupMembers.create(newMemberData, { transaction })
        } else {
          throw new Error('User not found')
        }

        return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.SUCCESS](res, {
          data: createdGroup,
          duration: `Next cashout scheduled for: ${formattedDate}`,
        })
      })
    } else {
      // handle error case where Groups.sequelize is undefined
      return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.INTERNAL_SERVER](res, {
        error: 'Sequelize instance not found',
      })
    }
  } catch (error) {
    await Wallets.destroy({ where: { ownerId: groupId } })
    await Groups.destroy({ where: { id: groupId } })
    await GroupMembers.destroy({ where: { groupId } })

    return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.INTERNAL_SERVER](res, error)
  }
}
