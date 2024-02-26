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
import Wallets from '../../models/wallets'
import { fundWalletSchema } from '../../utils/validators'
import { createTransaction } from './helpers'

/**
 * TODO: More Refactor here
 * At this point amount
 *
 */
export const fundWallet = async (req: RequestExt, res: Response) => {
  try {
    const { _userId, amount, walletType, transactionType } = req.body

    const parsedData = fundWalletSchema
      .omit({ groupId: true })
      .strict()
      .safeParse({ amount, walletType, transactionType })

    if (!parsedData.success) {
      return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.BAD_REQUEST](res, {
        message: parsedData.error.issues,
      })
    }

    const _walletType = parsedData.data.walletType
    const _transactionType = parsedData.data.transactionType
    const _amount = parsedData.data.amount

    const userWallet = await Wallets.findOne({
      where: { ownerId: _userId, type: _walletType },
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

      const transaction = await userWallet.update(
        { balance: copyBalance },
        { returning: true }
      )

      await createTransaction({
        senderId: _userId,
        receiverId: transaction.id,
        action: transactionActionType[_transactionType],
        previousBalance,
        balance: transaction.balance,
        amount: _amount,
        status: transactionStatusType.PENDING,
        transferType: transactionTransferType.INTERNAL_TRANSFERS,
        walletType: _walletType,
      })

      return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.SUCCESS](res)
    }

    return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.NOT_FOUND](res)
  } catch (error) {
    // reverse the error if any error occurs
    console.log(error)
    return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.INTERNAL_SERVER](res)
  }
}

export const fundGroupWallet = async (req: RequestExt, res: Response) => {
  try {
    const { _userId, amount, groupId } = req.body

    const parsedData = fundWalletSchema
      .omit({ transactionType: true, walletType: true })
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
        where: { ownerId: _groupId },
      })

      if (groupWallet) {
        const previousBalance = groupWallet.balance

        const wallet = await groupWallet.update(
          {
            balance: (groupWallet.balance += _amount),
          },
          { returning: true }
        )

        await createTransaction({
          senderId: _userId,
          receiverId: _groupId,
          action: transactionActionType.CREDIT,
          previousBalance,
          balance: wallet.balance,
          amount: _amount,
          status: transactionStatusType.PENDING,
          transferType: transactionTransferType.GROUP_TRANSACTIONS,
          walletType: transactionWalletType.GROUP,
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
