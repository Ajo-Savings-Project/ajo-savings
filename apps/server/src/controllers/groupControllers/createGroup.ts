import { Response } from 'express'
import { RequestExt } from '../../middlware/authorization/authentication'
import { HTTP_STATUS_CODE } from '../../constants'
import { v4 } from 'uuid'
import Groups, { Members } from '../../models/groups'
import Wallets, { WalletType } from '../../models/wallets'
import { createGroupSchema } from '../../utils/validators'
import { v2 as cloudinary } from 'cloudinary'

export const createGroup = async (req: RequestExt, res: Response) => {
  const { _user: user, _userId: userId, ...rest } = req.body

  const requestData = createGroupSchema.strict().safeParse(rest)

  if (!requestData.success) {
    return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
      message: requestData.error.issues,
    })
  }

  const _data = requestData.data
  const groupId = v4()

  try {
    // Check if an image file is uploaded
    let groupImage = ''
    if (req.file) {
      // Upload image to Cloudinary
      const result = await cloudinary.uploader.upload(
        req.file.buffer.toString('base64')
      )
      groupImage = result.secure_url
    }

    const member: Members = {
      name: `${user!.firstName} ${user!.lastName}`,
      memberPicture: user!.profilePic || null,
      memberId: userId,
      amountContributed: 0,
      amountWithdrawn: 0,
      dateOfLastContribution: new Date(),
      profilePicture: user!.profilePic || null,
    }

    const newGroup = {
      id: groupId,
      title: _data.groupName,
      description: _data.purposeAndGoals,
      adminId: userId,
      contributionAmount: _data.contributionAmount,
      // TODO: image upload logic
      groupImage: groupImage,
      amountContributed: 0,
      groupTransactions: [],
      amountWithdrawn: 0,
      members: [member],
      slots: [],
      availableSlots: [],
      numberOfParticipants: _data.numberOfParticipants,
      frequency: _data.frequency,
      duration: _data.duration,
      startDate: new Date(_data.startDate),
      endDate: new Date(_data.endDate),
    }

    const createdGroup = await Groups.create(newGroup)

    console.log({ createdGroup })

    const groupWallet = await Wallets.create({
      id: v4(),
      userId: userId,
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
    await Wallets.destroy({ where: { userId: groupId } })
    await Groups.destroy({ where: { id: groupId } })
    return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER).json({
      message: 'Something went wrong, our team has been notified.',
    })
  }
}
