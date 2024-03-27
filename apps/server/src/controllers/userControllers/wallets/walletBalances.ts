import { Response } from 'express'
import { HTTP_STATUS_CODE, HTTP_STATUS_HELPER } from '../../../constants'
import { RequestExt } from '../../../middleware/authorization/authentication'
import GroupMembers from '../../../models/groupMembers'
import Groups from '../../../models/groups'
import GroupWallet from '../../../models/groupWallet'
import Wallets from '../../../models/wallets'

export const getUserWalletBalances = async (req: RequestExt, res: Response) => {
  try {
    const { _userId: userId } = req.body

    let data = {} as Record<string, unknown>

    const personalWallets = await Wallets.findAll({
      where: { userId: userId },
      attributes: ['id', 'balance', 'type'],
    })

    const groupBalances = await GroupMembers.findAll({
      where: { userId },
      include: [
        {
          model: Groups,
          where: { ownerId: userId },
          as: 'group',
          include: [
            {
              model: GroupWallet,
              as: 'groupWallet',
              attributes: ['balance'],
            },
          ],
        },
      ],
    })

    if (personalWallets && groupBalances) {
      const personal = personalWallets.reduce(
        (acc, wallet) => {
          acc[wallet.type] = {
            id: wallet.id,
            balance: wallet.balance,
          }
          return acc
        },
        {} as Record<string, unknown>
      )

      const groups = (
        groupBalances as unknown as Record<string, unknown>[]
      ).reduce(
        (acc, cur) => {
          const group: any = cur.group
          acc.balance += group.groupWallet.balance
          acc.records = [
            ...(acc.records as any),
            {
              id: group.id,
              balance: group.groupWallet.balance,
            },
          ]
          return acc
        },
        { records: [], balance: 0 } as Record<string, unknown>
      )
      data = { ...data, ...personal, GROUPS: groups }
      return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.SUCCESS](res, { data })
    }

    return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.SUCCESS](res, { data })
  } catch (error) {
    return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.INTERNAL_SERVER](res, error)
  }
}
