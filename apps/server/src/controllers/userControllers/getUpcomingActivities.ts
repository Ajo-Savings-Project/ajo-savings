import { Response } from 'express'
import { Op } from 'sequelize'
import { HTTP_STATUS_CODE, HTTP_STATUS_HELPER } from '../../constants'
import { RequestExt } from '../../middleware/authorization/authentication'
import Groups, { frequencyType } from '../../models/groups'
import GroupMembers from '../../models/groupMembers'
import { DateHandler } from '../../utils/helpers'

export const getUpcomingUserActivities = async (
  req: RequestExt,
  res: Response
) => {
  try {
    const { _userId: userId } = req.body
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()
    const currentMonth = currentDate.getMonth()
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0)

    const userGroups: Groups[] = await Groups.findAll({
      include: [
        {
          model: GroupMembers,
          as: 'members',
          attributes: [],
          where: {
            userId: userId,
          },
        },
      ],
      where: {
        [Op.or]: [{ userId: userId }, { '$members.userId$': userId }],
      },
    })

    const contributions = []

    for (const group of userGroups) {
      const recurringAmount = group.recurringAmount
      const groupName = group.title
      const image = group.groupImage

      if (group.frequency === frequencyType.DAILY) {
        const daysInMonth = DateHandler.getDaysInMonth(
          currentYear,
          currentMonth
        )
        for (let day = 1; day <= daysInMonth; day++) {
          const contributionDate = new Date(currentYear, currentMonth, day)

          const contributionDetails = {
            groupName,
            recurringAmount,
            date: contributionDate,
            image,
          }
          if (contributionDate >= currentDate) {
            contributions.push(contributionDetails)
          }
        }
      } else if (group.frequency === frequencyType.WEEKLY) {
        let currentWeekEnd = DateHandler.getNextFriday(currentDate)

        while (currentWeekEnd <= lastDayOfMonth) {
          const contributionDetails = {
            groupName,
            recurringAmount,
            date: currentWeekEnd,
            image,
          }

          if (currentWeekEnd >= currentDate) {
            contributions.push(contributionDetails)
          }
          const oneWeek = 7 * 24 * 60 * 60 * 1000

          currentWeekEnd = new Date(currentWeekEnd.getTime() + oneWeek)
        }
      } else if (group.frequency === frequencyType.MONTHLY) {
        const contributionDetails = {
          groupName,
          recurringAmount,
          date: lastDayOfMonth,
          image,
        }
        if (lastDayOfMonth >= currentDate) {
          contributions.push(contributionDetails)
        }
      }
    }

    // Paginate the contributions array
    let page = parseInt(req.query.page as string) || 1

    if (Number.isNaN(page) || page <= 0) {
      return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
        message: 'Invalid page number',
      })
    }
    const limit = 5
    const offset = (page - 1) * limit

    const results = await Groups.findAndCountAll({
      offset,
      limit,
      order: [['createdAt', 'DESC']],
    })

    const pagination = {
      totalItems: results.count,
      totalPages: Math.ceil(results.count / limit),
      currentPage: page,
      pageSize: limit,
    }

    if (page > pagination.totalPages) {
      page = pagination.totalPages
    }
    pagination.currentPage = page

    return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.SUCCESS](res, {
      pagination,
      contributions: results.rows,
    })
  } catch (err) {
    HTTP_STATUS_HELPER[HTTP_STATUS_CODE.INTERNAL_SERVER](res, err)
  }
}
