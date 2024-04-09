import { Request, Response } from 'express'
import { Op } from 'sequelize'
import { HTTP_STATUS_CODE, HTTP_STATUS_HELPER } from '../../constants'
import { RequestExt } from '../../middleware/authorization/authentication'
import GroupMembers from '../../models/groupMembers'
import Groups from '../../models/groups'
import Users from '../../models/users'
import { withPaginate } from '../../utils/hocs/withPaginate'
import { joinGroupSchema } from '../../utils/validators'
import { createNewMember } from './helpers'

const userAttributes = ['firstName', 'email', 'lastName', 'id']

//TODO - document api, it was only created for testing

/**
 * Explore groups, returns all groups where the authenticated user is not a member
 * @param {e.Request} req
 * @param {e.Response} res
 * @returns {Promise<void>}
 */
export const getGroups = async (req: Request, res: Response) => {
  const { _userId } = req.body
  try {
    const result = await withPaginate(Groups, { ...req.query })({
      where: { [Op.not]: { adminId: _userId } },
      include: [
        {
          model: GroupMembers,
          as: 'groupMembers',
          include: [
            {
              model: Users,
              as: 'user',
              attributes: ['profilePic', 'id', 'firstName'],
            },
          ],
        },
        { model: Users, as: 'user', attributes: userAttributes },
      ],
    })

    return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.SUCCESS](res, {
      ...result,
    })
  } catch (e) {
    console.log(e)
    return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.INTERNAL_SERVER](res)
  }
}

/**
 * Get Active/Created groups where the authenticated user is a member
 */
export const getGroup = async (req: RequestExt, res: Response) => {
  const { _userId } = req.body

  const result = await withPaginate(GroupMembers, { ...req.query })({
    where: { userId: _userId },
    include: [
      {
        model: Groups,
        as: 'groupMember',
        include: [{ model: Users, as: 'user', attributes: userAttributes }],
      },
    ],
  })

  return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.SUCCESS](res, {
    ...result,
  })
}

/**
 * Join a group where the authenticated user is not a member
 * @param {RequestExt} req
 * @param {e.Response} res
 * @returns {Promise<void>}
 */
export const joinGroup = async (req: RequestExt, res: Response) => {
  const { _userId, ...rest } = req.body

  const hasGroupId = joinGroupSchema.safeParse(rest)

  try {
    if (!hasGroupId.success) {
      return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.BAD_REQUEST](res, {
        message: hasGroupId.error.message,
      })
    }

    const group = await Groups.findOne({
      where: {
        [Op.and]: [
          { id: hasGroupId.data.groupId },
          { title: hasGroupId.data.groupTitle },
        ],
      },
    })

    if (group) {
      const member = await GroupMembers.findOne({
        where: { userId: _userId, groupId: hasGroupId.data.groupId },
      })

      if (!member) {
        // Create new member only if user exists
        const newMemberData = await createNewMember({
          userId: _userId,
          groupId: hasGroupId.data.groupId,
          groupTitle: hasGroupId.data.groupTitle,
          options: { isAdmin: false },
        })

        if (newMemberData) {
          await GroupMembers.create(newMemberData)
        } else {
          throw new Error('User not found')
        }
      }
      return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.CONFLICT](res, {
        message: 'You are already a member of this group',
      })
    }

    return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.NOT_FOUND](res, {
      message: 'Group not found',
    })
  } catch (error) {
    return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.INTERNAL_SERVER](res)
  }
}
