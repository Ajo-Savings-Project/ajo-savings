import { Response } from 'express'
import { Op } from 'sequelize'
import { HTTP_STATUS_CODE } from '../../constants'
import { RequestExt } from '../../middleware/authorization/authentication'
import Groups, { frequency } from '../../models/groups'
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

    const userGroups = await Groups.findAll({
      where: {
        [Op.or]: [
          { adminId: userId },
          { members: { [Op.contains]: [userId] } },
        ],
        startDate: {
          [Op.lte]: currentDate,
        },
        endDate: {
          [Op.gte]: lastDayOfMonth,
        },
      },
    })

    const contributions = []

    for (const group of userGroups) {
      const contributionAmount = group.contributionAmount
      const groupName = group.title
      const image = group.groupImage

      if (group.frequency === frequency.DAILY) {
        const daysInMonth = DateHandler.getDaysInMonth(
          currentYear,
          currentMonth
        )
        for (let day = 1; day <= daysInMonth; day++) {
          const contributionDate = new Date(currentYear, currentMonth, day)

          const contributionDetails = {
            groupName,
            contributionAmount,
            date: contributionDate,
            image,
          }
          if (contributionDate >= currentDate) {
            contributions.push(contributionDetails)
          }
        }
      } else if (group.frequency === frequency.WEEKLY) {
        let currentWeekEnd = DateHandler.getNextFriday(currentDate)

        while (currentWeekEnd <= lastDayOfMonth) {
          const contributionDetails = {
            groupName,
            contributionAmount,
            date: currentWeekEnd,
            image,
          }

          if (currentWeekEnd >= currentDate) {
            contributions.push(contributionDetails)
          }
          const oneWeek = 7 * 24 * 60 * 60 * 1000

          currentWeekEnd = new Date(currentWeekEnd.getTime() + oneWeek)
        }
      } else if (group.frequency === frequency.MONTHLY) {
        const contributionDetails = {
          groupName,
          contributionAmount,
          date: lastDayOfMonth,
          image,
        }
        if (lastDayOfMonth >= currentDate) {
          contributions.push(contributionDetails)
        }
      }
    }

    try {
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

      return res.status(HTTP_STATUS_CODE.SUCCESS).json({
        message: `Retrieved user upcoming payments successfully`,
        pagination,
        contributions: results.rows,
      })
    } catch (error) {
      return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
        message: "Unable to retrieve user's upcoming payments",
      })
    }
  } catch (err) {
    console.log(err)
    return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER).json({
      message: 'Something went wrong, our team has been notified.',
    })
  }
}
