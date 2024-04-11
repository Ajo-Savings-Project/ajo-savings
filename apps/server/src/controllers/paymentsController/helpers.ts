import Transactions, {
  TransactionActionType,
  TransactionStatusType,
  TransactionTransferType,
  TransactionWalletType,
  transactionWalletType,
} from '../../models/transactions'
import { generateTransactionString } from '../../utils/helpers'
import { Transaction } from 'sequelize'

interface TransactionI {
  senderWalletId?: string
  receiverWalletId?: string
  senderName?: string
  receiverName?: string
  walletType: TransactionWalletType
  userWalletId?: string
  groupWalletId?: string
  targetWalletId?: string
  amount: number
  action: TransactionActionType
  status: TransactionStatusType
  transferType: TransactionTransferType
  transaction: Transaction
}

export const createTransaction = async ({
  walletType,
  amount,
  userWalletId,
  groupWalletId,
  targetWalletId,
  action,
  status,
  transferType,
  senderWalletId,
  receiverWalletId,
  senderName,
  receiverName,
  transaction,
}: TransactionI) => {
  if ((senderWalletId && senderName) || (receiverWalletId && receiverName)) {
    const transactionData = {
      id: generateTransactionString(),
      userWalletId,
      groupWalletId,
      targetWalletId,
      walletType: transactionWalletType[walletType],
      transferType,
      amount,
      status,
      action,
      description: '',
      createdAt: new Date(),
    }

    if (senderWalletId && senderName) {
      return await Transactions.create(
        {
          ...transactionData,
          senderWalletId,
          senderName,
        },
        { transaction }
      )
    } else if (receiverWalletId && receiverName) {
      return await Transactions.create(
        {
          ...transactionData,
          receiverWalletId,
          receiverName,
        },
        { transaction }
      )
    }
  } else {
    throw new Error(
      'Provide either senderWalletId and senderName or receiverWalletId and receiverName'
    )
  }
}
