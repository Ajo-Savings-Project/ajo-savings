import { Response } from 'express'
import { RequestExt } from '../../middleware/authorization/authentication'
import Transactions from '../../models/transactions'
import { HTTP_STATUS_CODE } from '../../constants'

export const getTransactionHistory = async (req: RequestExt, res: Response) => {
  try {
    const { _userId: userId } = req.body
    const transactionHistory = await Transactions.findAll({
      where: { ownerId: userId },
      order: [['createdAt', 'DESC']],
      limit: 5,
    })
    return res.status(HTTP_STATUS_CODE.SUCCESS).json({
      message: `Transaction history fetched successfully`,
      transactionHistory,
    })
  } catch (error) {
    console.log(error)
    return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER).json({
      message: 'Something went wrong, our team has been notified.',
    })
  }
}
