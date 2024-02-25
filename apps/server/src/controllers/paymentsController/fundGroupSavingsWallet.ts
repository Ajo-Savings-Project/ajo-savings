import { Response } from 'express'
import { Op } from 'sequelize'
import { HTTP_STATUS_CODE } from '../../constants'
import { RequestExt } from '../../middleware/authorization/authentication'
import GroupWallet from '../../models/groupWallet'
import Wallets, { walletType } from '../../models/wallets'
import { fundGroupWalletSchema } from '../../utils/validators'
import { v4 as uuidV4 } from 'uuid'
import {
  transactionStatus,
  transactionType,
  action,
} from '../../models/transactions'
import { createTransaction } from '../../utils/helpers'
import Earnings from '../../models/walletEarnings'

export const fundPersonalGroupWallet = async (
  req: RequestExt,
  res: Response
) => {
  try {
    const { _user: user, _userId: userId, ...rest } = req.body
    const verifyAmount = { amount: rest.amount }
    const reqData = fundGroupWalletSchema.strict().safeParse(verifyAmount)

    if (!reqData.success) {
      return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
        message: reqData.error.issues,
      })
    }

    const { amount } = reqData.data

    const groupSavingsWallet = await GroupWallet.findOne({
      where: { ownerId: userId },
    })

    const globalWallet = await Wallets.findOne({
      where: {
        [Op.and]: [{ ownerId: userId }, { type: walletType.GLOBAL }],
      },
    })

    if (globalWallet && groupSavingsWallet) {
      if (globalWallet.balance < amount) {
        return res.status(HTTP_STATUS_CODE.FORBIDDEN).json({
          message: 'Insufficient funds in your global wallet',
        })
      }
      const newGlobalBalance = globalWallet.balance - amount
      const newGroupSavingsBalance = groupSavingsWallet.balance + amount
      const id = uuidV4()

      const newIncome = {
        id,
        walletId: globalWallet.id,
        amount,
        date: new Date().toISOString(),
      }
      const newEarnings = await Earnings.create(newIncome)
      globalWallet.balance = newGlobalBalance
      const newGlobalWallet = await globalWallet.save()

      groupSavingsWallet.balance = newGroupSavingsBalance
      const newGroupSavingsWallet = await groupSavingsWallet.save()

      if (newGroupSavingsWallet && newGlobalWallet) {
        //create successful debit  transaction
        const globalGroupTransactionDetails = {
          walletId: newGlobalWallet.id,
          ownerId: userId,
          amount: amount,
          name: `${user.firstName} ${user.lastName}`,
          status: transactionStatus.SUCCESSFUL,
          action: action.DEBIT,
          type: transactionType.INTERNAL_TRANSFER,
          receiverId: newGroupSavingsWallet.id,
        }
        const groupGlobalDebit = await createTransaction(
          globalGroupTransactionDetails
        )
        //create successfull credit transaction
        const savingsGroupTransDetails = {
          walletId: newGroupSavingsWallet.id,
          ownerId: userId,
          amount: amount,
          name: `${user.firstName}${user.lastName}`,
          status: transactionStatus.SUCCESSFUL,
          action: action.CREDIT,
          type: transactionType.INTERNAL_TRANSFER,
          senderId: newGlobalWallet.id,
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
            newEarnings,
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
