import { differenceInDays } from 'date-fns'
import { RequestExt } from '../../middleware/authorization/authentication'
import { Response } from 'express'
import Targets, { targetFrequencyType } from '../../models/targets'
import { v4 } from 'uuid'
import { HTTP_STATUS_CODE, HTTP_STATUS_HELPER } from '../../constants'
import TargetWallets from '../../models/targetWallets'
import { createTargetSchema } from '../../utils/validators'

export const createTarget = async (req: RequestExt, res: Response) => {
  const { _userId: userId, ...rest } = req.body

  const requestData = createTargetSchema.safeParse(rest)

  if (!requestData.success) {
    return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.BAD_REQUEST](res, {
      message: requestData.error.issues,
    })
  }

  try {
    const { frequency, category, ...rest } = requestData.data

    const target = await Targets.create({
      ...rest,
      id: v4(),
      avatar: '',
      userId: userId,
      category: category,
      frequency: targetFrequencyType[frequency],
    })

    const wallet = await TargetWallets.create(
      {
        id: v4(),
        targetAmount: 0,
        amountSaved: 0,
        targetId: target.id,
        userId: userId,
      },
      { returning: true }
    )

    const daysLeft = differenceInDays(
      new Date(rest.withdrawalDate),
      new Date(rest.startDate)
    )

    return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.SUCCESS](res, {
      data: { daysLeft, name: rest.name, id: target.id, wallet },
    })
  } catch (error) {
    return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.INTERNAL_SERVER](res)
  }
}
