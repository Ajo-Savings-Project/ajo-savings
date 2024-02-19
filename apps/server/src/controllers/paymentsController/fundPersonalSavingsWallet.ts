import { Response } from 'express'
import { Op } from 'sequelize'
import { HTTP_STATUS_CODE, HTTP_STATUS_HELPER } from '../../constants'
import { RequestExt } from '../../middleware/authorization/authentication'
import Wallets, { WalletType, OwnerType } from '../../models/wallets'
import Earnings from '../../models/walletEarnings'
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
    const { _user: user, _userId: userId, ...rest } = req.body
    const verifyAmount = { amount: rest.amount }
    const reqData = fundWalletSchema.strict().safeParse(verifyAmount)

    if (!reqData.success) {
      return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.BAD_REQUEST](res, {
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
        return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.FORBIDDEN](res, {
          message: 'Insufficient funds in your global wallet',
        })
      }

      const newGlobalBalance = globalWallet.totalAmount - amount
      const newSavingsBalance = savingsWallet.totalAmount + amount
      const newSavingsIncome = savingsWallet.totalIncome + amount
      const newIncome = {
        walletId: savingsWallet.id,
        amount,
        date: new Date().toISOString(),
      }

      const newEarningsRecord = await Earnings.create(newIncome)

      globalWallet.totalAmount = newGlobalBalance
      const newGlobalWallet = await globalWallet.save()

      savingsWallet.totalAmount = newSavingsBalance
      savingsWallet.totalIncome = newSavingsIncome
      const newSavingsWallet = await savingsWallet.save()

      if (newSavingsWallet && newGlobalWallet) {
        //create successful debit  transaction
        const globalTransactionDetails = {
          walletId: newGlobalWallet.id,
          ownerId: userId,
          name: `${user.firstName} ${user.lastName}`,
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
          name: `${user.firstName + user.lastName}`,
          amount: amount,
          status: transactionStatus.SUCCESSFUL,
          action: action.CREDIT,
          type: transactionType.INTERNAL_TRANSFER,
          senderId: newGlobalWallet.id,
        }
        const savingsCreditTransaction =
          await createTransaction(savingsTransDetails)

        return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.SUCCESS](res, {
          message: `Transaction successful`,
          data: {
            newSavingsWallet,
            newGlobalWallet,
            globalDebitTransaction,
            savingsCreditTransaction,
            newEarningsRecord,
          },
        })
      }
    }
    return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.NOT_FOUND](res, {
      message: 'Your global wallet and savings wallet are not found',
    })
  } catch (error) {
    console.log(error)
    return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.INTERNAL_SERVER](res)
  }
}
