import { differenceInDays } from 'date-fns'
import { RequestExt } from '../../middleware/authorization/authentication'
import { Response } from 'express'
import Targets, {
  targetCategoryType,
  targetFrequencyType,
} from '../../models/targets'
import { v4 } from 'uuid'
import { HTTP_STATUS_CODE, HTTP_STATUS_HELPER } from '../../constants'
import TargetWallets from '../../models/targetWallets'
import { createSavingsSchema } from '../../utils/validators'

export const createTarget = async (req: RequestExt, res: Response) => {
  const { _userId: userId } = req.body

  try {
    const requestData = createSavingsSchema.safeParse(req.body)

    if (!requestData.success) {
      return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.BAD_REQUEST](res, {
        message: requestData.error.issues,
      })
    }

    const { frequency, category, ...rest } = requestData.data

    const wallet = await TargetWallets.create(
      {
        id: v4(),
        targetAmount: 0,
        amountSaved: 0,
      },
      { returning: true }
    )

    const target = await Targets.create({
      ...rest,
      id: v4(),
      avatar: '',
      walletId: wallet.id,
      userId: userId,
      category: targetCategoryType[category],
      frequency: targetFrequencyType[frequency],
    })

    const daysLeft = differenceInDays(
      new Date(rest.withdrawalDate),
      new Date(rest.startDate)
    )

    return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.SUCCESS](res, {
      data: { daysLeft, name: rest.name, id: target.id },
    })
  } catch (error) {
    console.log('Error creating target', error)
    return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.INTERNAL_SERVER](res)
  }
}
