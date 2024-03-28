import { Response } from 'express'
import { HTTP_STATUS_CODE, HTTP_STATUS_HELPER } from '../../../constants'
import { RequestExt } from '../../../middleware/authorization/authentication'
import GroupMembers from '../../../models/groupMembers'
import Groups from '../../../models/groups'
import GroupWallet from '../../../models/groupWallet'
import UserWallet from '../../../models/userWallets'

export const getUserWalletBalances = async (req: RequestExt, res: Response) => {
  try {
    const { _userId: userId } = req.body

    let data = {} as Record<string, unknown>

    const personalWallet = await UserWallet.findOne({
      where: { userId: userId },
      attributes: ['id', 'balance', 'type'],
    })

    const groupBalances = await GroupMembers.findAll({
      where: { userId },
      include: [
        {
          model: Groups,
          include: [
            {
              model: GroupWallet,
              attributes: ['balance'],
            },
          ],
        },
      ],
    })

    if (personalWallet && groupBalances) {
      const groups = (
        groupBalances as unknown as Record<string, unknown>[]
      ).reduce(
        (acc, cur) => {
          const group: any = cur.Group
          acc.balance += group.GroupWallet.balance
          acc.records = [
            ...(acc.records as any),
            {
              id: group.id,
              balance: group.GroupWallet.balance,
            },
          ]
          return acc
        },
        { records: [], balance: 0 } as Record<string, unknown>
      )
      data = { ...data, personalWallet, GROUPS: groups }
      return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.SUCCESS](res, { data })
    }

    return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.SUCCESS](res, { data })
  } catch (error) {
    return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.INTERNAL_SERVER](res, error)
  }
}
