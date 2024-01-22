import { Response } from 'express'
import { Op } from 'sequelize'
import { HTTP_STATUS_CODE } from '../../constants'
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

    return res.status(HTTP_STATUS_CODE.SUCCESS).json({
      message: 'user wallets fetched successfully',
      data: personalWallets,
    })
  } catch (error) {
    console.log(error)
    return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER).json({
      message: 'Something went wrong, our team has been notified.',
    })
  }
}
