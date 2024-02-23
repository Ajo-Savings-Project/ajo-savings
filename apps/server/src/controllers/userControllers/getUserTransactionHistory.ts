import { Response } from 'express'
import { Op } from 'sequelize'
import { RequestExt } from '../../middleware/authorization/authentication'
import Transactions from '../../models/transactions'
import { HTTP_STATUS_CODE } from '../../constants'
import Wallets from '../../models/wallets'
import Users from '../../models/users'
import { transactionHistorySchema } from '../../utils/validators/index'

export const getTransactionHistory = async (req: RequestExt, res: Response) => {
  try {
    const { _user: user, _userId: userId, ...rest } = req.body
    const paginate = { page: rest.page, pageSize: rest.pageSize }
    const validatePage = transactionHistorySchema.strict().safeParse(paginate)
    if (!validatePage.success) {
      return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
        message: validatePage.error.issues,
      })
    }
    const { page = 1, pageSize = 5 } = validatePage.data
    const startDate = new Date()
    startDate.setHours(0, 0, 0, 0) // Set hours to beginning of the day
    startDate.setDate(startDate.getDate() - startDate.getDay()) // Set date to Sunday

    // Get the end date of the current week (Saturday)
    const endDate = new Date(startDate)
    endDate.setDate(startDate.getDate() + 6) // Add 6 days to get to Saturday

    const offset = (page - 1) * pageSize // Calculate offset for pagination

    const userTransactions = await Transactions.findAndCountAll({
      where: {
        ownerId: userId,
        // Query the database to get data within the current week
        createdAt: { [Op.between]: [startDate, endDate] },
      },
      order: [['createdAt', 'DESC']],
      include: [{ model: Wallets }, { model: Users }],
      offset,
      limit: pageSize,
    })

    const totalTransactions = userTransactions.count
    const totalPages = Math.ceil(totalTransactions / pageSize)

    // Extract relevant information for the response
    const transactionHistory = userTransactions.rows.map((transaction) => ({
      id: transaction.id,
      walletId: transaction.walletId,
      ownerId: transaction.ownerId,
      action: transaction.action,
      type: transaction.type,
      receiverId: transaction.receiverId,
      senderId: transaction.senderId,
      date: transaction.createdAt,
      amount: transaction.amount,
      name: `${user.firstName} ${user.lastName}`,
    }))

    return res.status(HTTP_STATUS_CODE.SUCCESS).json({
      message: `Transaction history fetched successfully`,
      transactionHistory,
      totalPages,
      currentPage: page,
    })
  } catch (error) {
    console.log(error)
    return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER).json({
      message: 'Something went wrong, our team has been notified.',
    })
  }
}
