import { Response } from 'express'
import _ from 'lodash'
import { RequestExt } from '../../middleware/authorization/authentication'
import { HTTP_STATUS_CODE, HTTP_STATUS_HELPER } from '../../constants'
import { v4 } from 'uuid'
import Groups from '../../models/groups'
import Wallets, { WalletType, OwnerType } from '../../models/wallets'
import { createGroupSchema } from '../../utils/validators'
import { v2 as cloudinary } from 'cloudinary'
import { createNewMember } from './helpers'

export const createGroup = async (req: RequestExt, res: Response) => {
  const { _userId: userId, ...rest } = req.body

  const requestData = createGroupSchema
    .strict()
    .safeParse(_.omit(rest, ['_user']))

  if (!requestData.success) {
    return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
      message: requestData.error.issues,
    })
  }

  const _data = requestData.data

  const groupId = v4()

  try {
    const adminMember = await createNewMember(userId, { isAdmin: true })

    if (!adminMember) {
      return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.FORBIDDEN](res, {})
    }

    // Move this to background task
    let groupImage = ''
    if (req.file) {
      // Upload image to Cloudinary
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
      contributionAmount: _data.contributionAmount,
      groupImage: groupImage,
      amountContributedWithinFrequency: 0,
      groupTransactions: [],
      totalAmountWithdrawn: 0,
      members: [adminMember],
      availableNumberOfParticipants: 1,
      numberOfParticipants: _data.numberOfParticipants,
      frequency: _data.frequency,
      duration: _data.duration,
    }

    const createdGroup = await Groups.create(newGroup)

    console.log({ createdGroup })

    const groupWallet = await Wallets.create({
      id: v4(),
      ownerId: groupId,
      ownerType: OwnerType.GROUP,
      totalAmount: 0,
      type: WalletType.GROUP_WALLET,
      earnings: [],
      totalIncome: 0,
    })

    return res.status(HTTP_STATUS_CODE.CREATED).json({
      message: 'Group created successfully',
      group: createdGroup,
      wallet: groupWallet,
    })
  } catch (error) {
    console.log(error)
    await Wallets.destroy({ where: { ownerId: groupId } })
    await Groups.destroy({ where: { id: groupId } })
    return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER).json({
      message: 'Something went wrong, our team has been notified.',
    })
  }
}
