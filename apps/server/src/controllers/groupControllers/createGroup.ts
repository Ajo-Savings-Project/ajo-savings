import { v2 as cloudinary } from 'cloudinary'
import { Response } from 'express'
import _ from 'lodash'
import { v4 } from 'uuid'
import { HTTP_STATUS_CODE, HTTP_STATUS_HELPER } from '../../constants'
import { RequestExt } from '../../middleware/authorization/authentication'
import GroupMembers from '../../models/groupMembers'
import Groups, { FrequencyType } from '../../models/groups'
import GroupWallet from '../../models/groupWallet'
import Wallets from '../../models/wallets'
import { createGroupSchema } from '../../utils/validators'
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
      ownerId: userId,
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

    // associate user to group
    await GroupMembers.create(
      createNewMember({
        userId,
        groupId,
      })
    )

    await GroupWallet.create({
      id: v4(),
      ownerId: groupId,
      balance: 0,
    })

    return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.SUCCESS](res, {
      data: createdGroup,
    })
  } catch (error) {
    await Wallets.destroy({ where: { ownerId: groupId } })
    await Groups.destroy({ where: { id: groupId } })
    await GroupMembers.destroy({ where: { groupId } })
    return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.INTERNAL_SERVER](res, error)
  }
}
