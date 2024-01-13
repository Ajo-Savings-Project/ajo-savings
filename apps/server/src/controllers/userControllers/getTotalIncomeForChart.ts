// import { Response } from 'express'
// import { RequestExt } from 'middlware/authorization/authentication'
// import { HTTP_STATUS_CODE } from '../../constants'
// import Wallets,{ WalletType} from '../../models/wallets'
// import { Op } from 'sequelize'
// import Transactions,{transaction_type} from '../../models/transactions'
// import { db } from '../../config'

// export const getTotalIncomeForChart = async (
//   req: RequestExt,
//   res: Response
// ) => {

//   try {
//      const {_userId:userId} = req.body
//     const wallet = await Wallets.findOne({where:{
//         ownerId:userId
//     }})
//     if(!wallet) return res.status(HTTP_STATUS_CODE.NOT_FOUND).json("wallet not found")

//     const totalIncome = await Transactions.findAll({where:{
//     //  owner_id  , wallet_id
//     [Op.and] : [{owner_id:userId}, {wallet_id: wallet.id},{ action : transaction_type.CREDIT}, {type:WalletType.GLOBAL}, ]

//     },
//     order: [
//         [db.fn('EXTRACT', db.literal('MONTH FROM "createdAt"')), 'month'],
//         ['createdAt'] as unknown as string, // Add additional columns for sorting if needed
//       ],
// })
//    return res.json(totalIncome)
//   } catch (error) {
//     console.log('Error', error)
//     res
//       .status(HTTP_STATUS_CODE.INTERNAL_SERVER)
//       .json('The error is from our end, our engineer are working on it ')
//   }
// }

import { Response } from 'express'
import { RequestExt } from 'middlware/authorization/authentication'
import { HTTP_STATUS_CODE } from '../../constants'
import Wallets, { WalletType } from '../../models/wallets'
import { Op } from 'sequelize'
import Transactions, { action } from '../../models/transactions'
import { db } from '../../config'

export const getTotalIncomeForChart = async (
  req: RequestExt,
  res: Response
) => {
  try {
    const { _userId: userId } = req.body
    const globalWallet = await Wallets.findOne({
      where: {
        [Op.and]: [{ ownerId: userId }, { type: WalletType.GLOBAL }],
      },
    })
    if (!globalWallet)
      return res
        .status(HTTP_STATUS_CODE.NOT_FOUND)
        .json('globalWallet not found')

    //const currentDate = new Date();
    // write logic to determin firstDay of currentMonth

    const totalIncome = await Transactions.findAll({
      where: {
        //  owner_id  , wallet_id
        [Op.and]: [
          { owner_id: userId },
          { wallet_id: globalWallet.id },
          { action: action.CREDIT },
          { type: WalletType.GLOBAL },
        ],
      },
      order: [
        [db.fn('EXTRACT', db.literal('MONTH FROM "createdAt"')), 'month'],
        ['createdAt'] as unknown as string, // Add additional columns for sorting if needed
      ],
    })
    return res.json(totalIncome)
  } catch (error) {
    console.log('Error', error)
    res
      .status(HTTP_STATUS_CODE.INTERNAL_SERVER)
      .json('The error is from our end, our engineer are working on it ')
  }
}
