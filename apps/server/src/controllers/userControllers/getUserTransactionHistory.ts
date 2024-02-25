import { Response } from 'express'
import _ from 'lodash'
import { prop, pick, map, pipe, mergeAll, toUpper } from 'rambda'
import { Op } from 'sequelize'
import { RequestExt } from '../../middleware/authorization/authentication'
import Transactions from '../../models/transactions'
import { HTTP_STATUS_CODE, HTTP_STATUS_HELPER } from '../../constants'
import Wallets from '../../models/wallets'
import Users from '../../models/users'
import { betweenSaturdayAndSunday } from '../../utils/betweenSatSun'
import { withPaginate } from '../../utils/hocs/withPaginate'

const pickFieldsWithKey =
  (key: string, propsToPick: string[]) => (obj: unknown | object) => {
    const modData = pick(propsToPick)(prop(key, obj))
    return mergeAll([obj as object, { [key]: modData }])
  }

const publicUserFields = pickFieldsWithKey('User', [
  'id',
  'email',
  'firstName',
  'lastName',
])

const publicWalletFields = pickFieldsWithKey('Wallet', [
  'id',
  'balance',
  'type',
])

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

const objKeysToCamelCase = (obj: unknown | Record<string, unknown>) => {
  const newObj: Record<string, unknown> = {}
  for (const key in obj as object) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      newObj[_.camelCase(key)] = (obj as Record<string, unknown>)[key]
    }
  }
  return newObj
}

const resolveTransactionResponse = map(
  pipe(
    publicTransactionFields,
    publicWalletFields,
    publicUserFields,
    objKeysToCamelCase
  )
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
      order: [
        [
          'createdAt',
          req.query?.order ? toUpper(<string>req.query?.order) : 'DESC',
        ],
      ],
      include: [{ model: Wallets }, { model: Users }],
    })

    return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.SUCCESS](res, {
      ...userTransactions,
      data: resolveTransactionResponse(userTransactions.data),
    })
  } catch (err) {
    return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.INTERNAL_SERVER](res)
  }
}
