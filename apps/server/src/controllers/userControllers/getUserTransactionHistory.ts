import { Response } from 'express'
import { map, pick, pipe } from 'rambda'
import { Op } from 'sequelize'
import { HTTP_STATUS_CODE, HTTP_STATUS_HELPER } from '../../constants'
import { RequestExt } from '../../middleware/authorization/authentication'
import Transactions from '../../models/transactions'
import Users from '../../models/users'
import Wallets from '../../models/wallets'
import { betweenSaturdayAndSunday } from '../../utils/betweenSatSun'
import { publicUserFields, publicWalletFields } from '../../utils/helpers'
import { withPaginate } from '../../utils/hocs/withPaginate'

const publicTransactionFields = pick([
  'id',
  'amount',
  'type',
  'status',
  'createdAt',
  'receiverId',
  'senderId',
  'Wallet',
  'User',
])

const resolveTransactionResponse = map(
  pipe(publicTransactionFields, publicWalletFields, publicUserFields)
)

export const getTransactionHistory = async (req: RequestExt, res: Response) => {
  try {
    const { _userId: userId } = req.body

    const userTransactions = await withPaginate(Transactions, {
      page: Number(req.query?.page),
      limit: Number(req.query?.limit),
    })({
      where: {
        ownerId: userId,
        // Query the database to get data within the current week
        createdAt: { [Op.between]: betweenSaturdayAndSunday().arr },
      },
      include: [
        { model: Wallets, as: 'wallets' },
        { model: Users, as: 'users' },
      ],
    })

    return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.SUCCESS](res, {
      ...userTransactions,
      data: resolveTransactionResponse(userTransactions.data),
    })
  } catch (err) {
    return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.INTERNAL_SERVER](res)
  }
}
