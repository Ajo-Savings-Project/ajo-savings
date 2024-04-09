import { Response } from 'express'
import { HTTP_STATUS_CODE, HTTP_STATUS_HELPER } from '../../../constants'
import { RequestExt } from '../../../middleware/authorization/authentication'
import UserWallet from '../../../models/userWallet'

export const getUserWallets = async (req: RequestExt, res: Response) => {
  try {
    const { _userId: userId } = req.body

    const personalWallet = await UserWallet.findAll({
      where: { userId: userId },
      attributes: ['id', 'balance', 'type'],
    })

    if (personalWallet) {
      return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.SUCCESS](res, {
        data: personalWallet,
      })
    }

    return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.NOT_FOUND](res)
  } catch (error) {
    return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.INTERNAL_SERVER](res, error)
  }
}
