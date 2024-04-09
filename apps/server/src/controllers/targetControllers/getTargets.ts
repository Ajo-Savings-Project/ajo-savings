import { Response } from 'express'
import { HTTP_STATUS_CODE, HTTP_STATUS_HELPER } from '../../constants'
import { RequestExt } from '../../middleware/authorization/authentication'
import Targets from '../../models/targets'
import TargetWallet from '../../models/targetWallet'
import { withPaginate } from '../../utils/hocs/withPaginate'

export const getTargets = async (req: RequestExt, res: Response) => {
  const { _userId: userId } = req.body
  const { targetId } = req.params

  try {
    if (targetId) {
      const target = await Targets.findOne({
        where: { userId, id: targetId },
        include: [
          {
            model: TargetWallet,
            as: 'wallet',
            attributes: ['id', 'amountSaved', 'targetAmount'],
          },
        ],
      })

      if (!target) {
        return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.NOT_FOUND](res, {
          data: null,
        })
      }

      return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.SUCCESS](res, {
        data: target,
      })
    }

    const targets = await withPaginate(Targets, { ...req.query })({
      where: { userId },
      include: [
        {
          model: TargetWallet,
          as: 'wallet',
          attributes: ['id', 'amountSaved', 'targetAmount'],
        },
      ],
    })

    return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.SUCCESS](res, {
      ...targets,
    })
  } catch (error) {
    return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.INTERNAL_SERVER](res)
  }
}
