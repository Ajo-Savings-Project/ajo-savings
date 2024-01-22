import { Response } from 'express'
import { Op } from 'sequelize'
import { HTTP_STATUS_CODE } from '../../constants'
import { RequestExt } from '../../middlware/authorization/authentication'
import Wallets, { WalletType, OwnerType } from '../../models/wallets'
import { fundWalletSchema } from '../../utils/validators'
import {
  transactionStatus,
  transactionType,
  action,
} from '../../models/transactions'
import { createTransaction } from '../../utils/helpers'

export const fundPersonalSavingsWallet = async (
  req: RequestExt,
  res: Response
) => {
  try {
    const { _userId: userId, ...rest } = req.body
    const verifyAmount = { amount: rest.amount }
    const reqData = fundWalletSchema.strict().safeParse(verifyAmount)

    if (!reqData.success) {
      return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
        message: reqData.error.issues,
      })
    }

    const { amount } = reqData.data

    const savingsWallet = await Wallets.findOne({
      where: {
        [Op.and]: [
          { ownerId: userId },
          { ownerType: OwnerType.USER },
          { type: WalletType.SAVINGS },
        ],
      },
    })
    const globalWallet = await Wallets.findOne({
      where: {
        [Op.and]: [
          { ownerId: userId },
          { ownerType: OwnerType.USER },
          { type: WalletType.GLOBAL },
        ],
      },
    })

    if (globalWallet && savingsWallet) {
      if (globalWallet.totalAmount < amount) {
        return res.status(HTTP_STATUS_CODE.FORBIDDEN).json({
          message: 'Insufficient funds in your global wallet',
        })
      }

      const newGlobalBalance = globalWallet.totalAmount - amount
      const newSavingsBalance = savingsWallet.totalAmount + amount
      const newSavingsIncome = savingsWallet.totalIncome + amount
      const newIncome = {
        date: new Date(),
        amount,
      }

      const newEarnings = [...savingsWallet.earnings, newIncome]

      globalWallet.totalAmount = newGlobalBalance
      const newGlobalWallet = await globalWallet.save()

      savingsWallet.totalAmount = newSavingsBalance
      savingsWallet.totalIncome = newSavingsIncome
      savingsWallet.earnings = newEarnings
      const newSavingsWallet = await savingsWallet.save()

      if (newSavingsWallet && newGlobalWallet) {
        //create successful debit  transaction
        const globalTransactionDetails = {
          walletId: newGlobalWallet.id,
          ownerId: userId,
          amount: amount,
          status: transactionStatus.SUCCESSFUL,
          action: action.DEBIT,
          type: transactionType.INTERNAL_TRANSFER,
          receiverId: newSavingsWallet.id,
        }
        const globalDebitTransaction = await createTransaction(
          globalTransactionDetails
        )

        //create successfull credit transaction
        const savingsTransDetails = {
          walletId: newSavingsWallet.id,
          ownerId: userId,
          amount: amount,
          status: transactionStatus.SUCCESSFUL,
          action: action.CREDIT,
          type: transactionType.INTERNAL_TRANSFER,
          senderId: newGlobalWallet.id,
        }
        const savingsCreditTransaction =
          await createTransaction(savingsTransDetails)

        return res.status(HTTP_STATUS_CODE.SUCCESS).json({
          message: `Transaction successful`,
          data: {
            newSavingsWallet,
            newGlobalWallet,
            globalDebitTransaction,
            savingsCreditTransaction,
          },
        })
      }
    }
  } catch (error) {
    console.log(error)
    return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER).json({
      message: 'Something went wrong, our team has been notified.',
    })
  }
}
