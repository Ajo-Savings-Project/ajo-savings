import { Response } from 'express'
import { Op, Transaction } from 'sequelize'
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
import { db } from '../../config'

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

      //initialize a dataBase transaction
      const transaction: Transaction = await db.transaction()

      try {
        const updatedWallet = await userWallet.update(
          { balance: copyBalance },
          { returning: true, transaction } //pass transaction object
        )

        if (updatedWallet) {
          await createTransaction({
            senderWalletId: _userId,
            walletId: updatedWallet.id,
            action: transactionActionType[_transactionType],
            amount: _amount,
            status: transactionStatusType.PENDING,
            transferType: transactionTransferType.INTERNAL_TRANSFERS,
            walletType: transactionWalletType.GLOBAL,
            transaction, // pass transacction object
          })

          //commit transaction to save changes if everything goes well
          await transaction.commit()
          return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.SUCCESS](res)
        }
      } catch (error) {
        //rollback transaction to revert changes if any error occurs.
        await transaction.rollback()
        throw error
      }
    }
    return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.NOT_FOUND](res)
  } catch (error) {
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

        const transaction: Transaction = await db.transaction()

        try {
          const newGroupWallet = await groupWallet.update(
            {
              balance: (groupWallet.balance += _amount),
            },
            { returning: true, transaction }
          )

          const newUserWallet = await userWallet.update(
            {
              balance: (userWallet.balance -= _amount),
            },
            { returning: true, transaction }
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
            transaction,
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
            transaction,
          })

          await transaction.commit()
          return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.SUCCESS](res)
        } catch (error) {
          await transaction.rollback()
          throw error
        }
      }
    }
    return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.NOT_FOUND](res)
  } catch (error) {
    return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.INTERNAL_SERVER](res)
  }
}
