import { Response } from 'express'
import { HTTP_STATUS_CODE, HTTP_STATUS_HELPER } from '../../../constants'
import { RequestExt } from '../../../middleware/authorization/authentication'
import Wallets from '../../../models/wallets'

export const getUserWallets = async (req: RequestExt, res: Response) => {
  try {
    const { _userId: userId } = req.body

    const personalWallets = await Wallets.findAll({
      where: { userId: userId },
      attributes: ['id', 'balance', 'type'],
    })

    if (personalWallets) {
      return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.SUCCESS](res, {
        data: personalWallets.reduce(
          (acc, wallet) => {
            acc[wallet.type] = wallet
            return acc
          },
          {} as Record<string, unknown>
        ),
      })
    }

    return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.NOT_FOUND](res)
  } catch (error) {
    return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.INTERNAL_SERVER](res, error)
  }
}
