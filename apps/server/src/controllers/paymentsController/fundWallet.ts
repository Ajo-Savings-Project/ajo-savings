import { Response } from 'express'
import { Op } from 'sequelize'
import { HTTP_STATUS_CODE, HTTP_STATUS_HELPER } from '../../constants'
import { RequestExt } from '../../middleware/authorization/authentication'
import GroupMembers from '../../models/groupMembers'
import GroupWallet from '../../models/groupWallet'
import {
  transactionActionType,
  transactionStatusType,
  transactionTransferType,
  transactionWalletType,
} from '../../models/transactions'
import Wallets from '../../models/userWallets'
import { fundWalletSchema } from '../../utils/validators'
import { createTransaction } from './helpers'
import Transactions from '../../models/transactions'

/**
 * TODO: More Refactor here
 * At this point amount
 *
 */
export const fundWallet = async (req: RequestExt, res: Response) => {
  const { _userId, amount, transactionType } = req.body

  const parsedData = fundWalletSchema
    .omit({ groupId: true, targetId: true })
    .strict()
    .safeParse({ amount, transactionType })

  try {
    if (!parsedData.success) {
      return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.BAD_REQUEST](res, {
        message: parsedData.error.issues,
      })
    }

    const _transactionType = parsedData.data.transactionType
    const _amount = parsedData.data.amount

    const userWallet = await Wallets.findOne({
      where: { userId: _userId },
    })

    if (userWallet) {
      const previousBalance = userWallet.balance
      let copyBalance = previousBalance

      if (transactionType === transactionActionType.DEBIT) {
        if (userWallet.balance < _amount) {
          return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.CONFLICT](res, {
            message: 'Insufficient balance',
          })
        }
        copyBalance = userWallet.balance - _amount
      } else if (transactionType === transactionActionType.CREDIT) {
        copyBalance = userWallet.balance + _amount
      }

      const updatedWallet = await userWallet.update(
        { balance: copyBalance },
        { returning: true }
      )

      await createTransaction({
        senderWalletId: _userId,
        walletId: updatedWallet.id,
        action: transactionActionType[_transactionType],
        amount: _amount,
        status: transactionStatusType.PENDING,
        transferType: transactionTransferType.INTERNAL_TRANSFERS,
        walletType: transactionWalletType.GLOBAL,
      })

      return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.SUCCESS](res)
    }

    return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.NOT_FOUND](res)
  } catch (error) {
    // reverse the transaction if any error occurs
    await Transactions.destroy({ where: { walletId: _userId } })
    return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.INTERNAL_SERVER](res)
  }
}

export const fundGroupWallet = async (req: RequestExt, res: Response) => {
  try {
    const { _userId, _user, amount, groupId } = req.body

    const parsedData = fundWalletSchema
      .omit({ transactionType: true, walletType: true, targetId: true })
      .strict()
      .safeParse({ amount, groupId })

    if (!parsedData.success) {
      return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.BAD_REQUEST](res, {
        message: parsedData.error.issues,
      })
    }

    const _groupId = parsedData.data.groupId
    const _amount = parsedData.data.amount

    const isUserInGroup = await GroupMembers.findOne({
      where: { [Op.and]: [{ userId: _userId }, { groupId: _groupId }] },
    })

    if (isUserInGroup) {
      const groupWallet = await GroupWallet.findOne({
        where: { groupId: _groupId },
      })

      const userWallet = await Wallets.findOne({
        where: { userId: _userId },
      })

      if (groupWallet && userWallet) {
        if (userWallet.balance < _amount) {
          return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.CONFLICT](res, {
            message: 'Insufficient balance',
          })
        }

        const newGroupWallet = await groupWallet.update(
          {
            balance: (groupWallet.balance += _amount),
          },
          { returning: true }
        )

        const newUserWallet = await userWallet.update(
          {
            balance: (userWallet.balance -= _amount),
          },
          { returning: true }
        )

        //credit transaction
        await createTransaction({
          senderWalletId: newUserWallet.id,
          senderName: `${_user.firstName} ${_user.lastName}`,
          action: transactionActionType.CREDIT,
          walletId: newGroupWallet.id,
          amount: _amount,
          status: transactionStatusType.SUCCESSFUL,
          transferType: transactionTransferType.GROUP_TRANSACTIONS,
          walletType: transactionWalletType.GROUP,
        })

        //debit transaction
        await createTransaction({
          receiverWalletId: newGroupWallet.id,
          receiverName: isUserInGroup.groupTitle,
          action: transactionActionType.DEBIT,
          walletId: newUserWallet.id,
          amount: _amount,
          status: transactionStatusType.SUCCESSFUL,
          transferType: transactionTransferType.GROUP_TRANSACTIONS,
          walletType: transactionWalletType.GLOBAL,
        })

        return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.SUCCESS](res)
      }
    }
    return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.NOT_FOUND](res)
  } catch (error) {
    // TODO: reverse the transaction if any error
    return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.INTERNAL_SERVER](res)
  }
}
