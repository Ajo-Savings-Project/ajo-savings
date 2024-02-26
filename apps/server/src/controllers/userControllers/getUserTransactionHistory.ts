import { Response } from 'express'
import { Op } from 'sequelize'
import { HTTP_STATUS_CODE, HTTP_STATUS_HELPER } from '../../constants'
import { RequestExt } from '../../middleware/authorization/authentication'
import Transactions from '../../models/transactions'
import { betweenSaturdayAndSunday } from '../../utils/betweenSatSun'
import { withPaginate } from '../../utils/hocs/withPaginate'

export const getTransactionHistory = async (req: RequestExt, res: Response) => {
  try {
    const { _userId: userId } = req.body

    const userTransactions = await withPaginate(Transactions, { ...req.query })(
      {
        attributes: [
          'id',
          'transactionId',
          'walletType',
          'transferType',
          'amount',
          'status',
          'action',
          'receiverId',
          'senderId',
          'createdAt',
        ],
        where: {
          [Op.or]: [{ senderId: userId }, { receiverId: userId }],
          createdAt: { [Op.between]: betweenSaturdayAndSunday().arr },
        },
      }
    )

    return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.SUCCESS](res, {
      ...userTransactions,
    })
  } catch (err) {
    console.log(err)
    return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.INTERNAL_SERVER](res)
  }
}
