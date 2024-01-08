import { Response } from 'express'
import { RequestExt } from 'middlware/authorization/authentication'
import { HTTP_STATUS_CODE } from '../../constants'
import Wallets from '../../models/wallets'

export const getTotalIncomeForChart = async (
  req: RequestExt,
  res: Response
) => {
  console.log('total income made')
  try {
    const userId = req.params.id
    const totalIncome = await Wallets.getTotalIncome(userId)
    return res.status(HTTP_STATUS_CODE.SUCCESS).json({
      message: 'totalIncome fetched successfully',
      data: totalIncome,
    })
  } catch (error) {
    console.log('Error', error)
    res
      .status(HTTP_STATUS_CODE.INTERNAL_SERVER)
      .json('The error is from our end, our engineer are working on it ')
  }
}
