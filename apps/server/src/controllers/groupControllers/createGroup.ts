import { Response } from 'express'
import { JwtPayload } from 'jsonwebtoken'
import Users from '../../models/users'
import { HTTP_STATUS_CODE } from '../../constants/httpStatusCode'
import { v4 } from 'uuid'
import Groups, { GroupAttributes, Members } from '../../models/groups'
import Wallets, { type } from '../../models/wallets'

export const createGroup = async (req: JwtPayload, res: Response) => {
  try {
    const userId = req.user.id
    const user = await Users.findOne({
      where: { id: userId },
    })
    if (!user) {
      return res.status(HTTP_STATUS_CODE.UNAUTHORIZED).json({
        message: 'Unauthorized user',
      })
    }
    // Extract the group information from the request body
    const {
      group_name,
      purpose_and_goals,
      frequency,
      startDate,
      endDate,
      number_of_participants,
      duration,
    } = req.body
    // Create a new group in the database
    const member: Members = {
      member_picture: user.profilePic || null,
      member_id: userId,
      name: `${user.firstName} ${user.lastName}`,
      amount_contributed: 0,
      amount_withdrawn: 0,
      date_of_last_contribution: new Date(),
      profilePicture: user.profilePic || null,
    }
    const newGroup: GroupAttributes = {
      id: v4(), // Generate a UUID for the group ID
      title: group_name,
      description: purpose_and_goals,
      admin_id: userId,
      contribution_amount: 0,
      group_image: req?.file?.path,
      amount_contributed: 0, // Initialize with zero contributions
      group_transactions: [], // Initialize with an empty array
      amount_withdrawn: 0, // Initialize with zero withdrawals
      members: [member],
      slots: [],
      availableSlots: [],
      number_of_participants, // Initialize with zero participants
      frequency,
      duration,
      startDate: startDate || new Date(),
      endDate: endDate || new Date(),
      created_at: new Date(),
    }
    // Save the new group to the database
    const createdGroup = await Groups.create(newGroup)
    if (createdGroup) {
      const findGroup = (await Groups.findOne({
        where: { admin_id: userId },
      })) as unknown as GroupAttributes
      const groupWalletId = v4()
      const groupWallet = await Wallets.create({
        id: groupWalletId,
        user_id: findGroup.id,
        total_amount: 500000,
        type: type.GROUP_WALLET,
        created_at: new Date(),
        // total_group_savings: 0,
        // total_personal_savings: 0,
        earnings: [],
        total_income: 0,
      })
      const checkGroupWallet = await Wallets.findOne({
        where: { user_id: findGroup.id },
      })
      if (!checkGroupWallet) {
        await Groups.destroy({ where: { id: findGroup.id } })
        return res.status(400).json({
          message: `Unable to register Group`,
        })
      }
      return res.status(HTTP_STATUS_CODE.CREATED).json({
        message: 'Group created successfully',
        group: createdGroup,
        wallet: groupWallet,
      })
    }
    return res
      .status(HTTP_STATUS_CODE.BAD_REQUEST)
      .json({ message: `Unable to create group, contact admin` })
  } catch (error: unknown) {
    console.error(error)
    return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER).json({
      message: 'Internal Server Error',
    })
  }
}
