import { Response } from 'express'
import { Op } from 'sequelize'
import { HTTP_STATUS_CODE, HTTP_STATUS_HELPER } from '../../constants'
import { RequestExt } from '../../middleware/authorization/authentication'
import Wallets, { WalletType, OwnerType } from '../../models/wallets'

export const getUserPersonalSavingsWallet = async (
  req: RequestExt,
  res: Response
) => {
  try {
    const { _userId: userId } = req.body

    const personalWallets = await Wallets.findAll({
      where: {
        [Op.and]: [
          { ownerId: userId },
          { ownerType: OwnerType.USER },
          {
            [Op.or]: [
              { type: WalletType.SAVINGS },
              { type: WalletType.GROUP_WALLET },
              { type: WalletType.GLOBAL },
            ],
          },
        ],
      },
    })

    return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.SUCCESS](res, {
      message: 'user wallets fetched successfully',
      data: personalWallets,
    })
  } catch (error) {
    console.log(error)
    return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.INTERNAL_SERVER](res, error)
  }
}
