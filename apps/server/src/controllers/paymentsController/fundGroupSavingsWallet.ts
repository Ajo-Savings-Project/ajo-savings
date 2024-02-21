import { Response } from 'express'
import { Op } from 'sequelize'
import { HTTP_STATUS_CODE } from '../../constants'
import { RequestExt } from '../../middleware/authorization/authentication'
import Wallets, { WalletType, OwnerType } from '../../models/wallets'
import { fundGroupWalletSchema } from '../../utils/validators'
import {
  transactionStatus,
  transactionType,
  action,
} from '../../models/transactions'
import { createTransaction } from '../../utils/helpers'

export const fundPersonalGroupWallet = async (
  req: RequestExt,
  res: Response
) => {
  try {
    const { _userId: userId, ...rest } = req.body
    const verifyAmount = { amount: rest.amount, email: rest.email }
    const reqData = fundGroupWalletSchema.strict().safeParse(verifyAmount)

    if (!reqData.success) {
      return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
        message: reqData.error.issues,
      })
    }

    const { amount } = reqData.data

    const groupSavingsWallet = await Wallets.findOne({
      where: {
        [Op.and]: [
          { ownerId: userId },
          { ownerType: OwnerType.USER },
          { type: WalletType.GROUP_WALLET },
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

    if (globalWallet && groupSavingsWallet) {
      if (globalWallet.totalAmount < amount) {
        return res.status(HTTP_STATUS_CODE.FORBIDDEN).json({
          message: 'Insufficient funds in your global wallet',
        })
      }
      const newGlobalBalance = globalWallet.totalAmount - amount
      const newGroupSavingsBalance = groupSavingsWallet.totalAmount + amount
      const newGoupSavingsIncome = groupSavingsWallet.totalIncome + amount
      const newIncome = {
        amount,
        date: new Date(),
      }
      const newEarnings = [...groupSavingsWallet.earnings, newIncome]

      globalWallet.totalAmount = newGlobalBalance
      const newGlobalWallet = await globalWallet.save()

      groupSavingsWallet.totalAmount = newGroupSavingsBalance
      groupSavingsWallet.totalIncome = newGoupSavingsIncome
      groupSavingsWallet.earnings = newEarnings
      const newGroupSavingsWallet = await groupSavingsWallet.save()

      if (newGroupSavingsWallet && newGlobalWallet) {
        //create successful debit  transaction
        const globalGroupTransactionDetails = {
          walletId: newGlobalWallet.id,
          ownerId: userId,
          amount: amount,
          status: transactionStatus.SUCCESSFUL,
          action: action.DEBIT,
          type: transactionType.INTERNAL_TRANSFER,
          receiverId: newGroupSavingsWallet.id,
          createdAt: newGroupSavingsWallet.createdAt,
          updatedAt: newGroupSavingsWallet.updatedAt,
        }
        const groupGlobalDebit = await createTransaction(
          globalGroupTransactionDetails
        )
        //create successfull credit transaction
        const savingsGroupTransDetails = {
          walletId: newGroupSavingsWallet.id,
          ownerId: userId,
          amount: amount,
          status: transactionStatus.SUCCESSFUL,
          action: action.CREDIT,
          type: transactionType.INTERNAL_TRANSFER,
          senderId: newGlobalWallet.id,
          createdAt: newGlobalWallet.createdAt,
          updatedAt: newGlobalWallet.updatedAt,
        }
        const groupSavingsTrans = await createTransaction(
          savingsGroupTransDetails
        )

        return res.status(HTTP_STATUS_CODE.SUCCESS).json({
          message: `Transaction successful`,
          data: {
            newGroupSavingsWallet,
            newGlobalWallet,
            groupSavingsTrans,
            groupGlobalDebit,
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
