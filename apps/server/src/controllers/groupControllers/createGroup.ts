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

export const createGroup = async (req: RequestExt, res: Response) => {
  const { _userId: userId, ...rest } = req.body

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
      duration: _data.duration,
    }

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
