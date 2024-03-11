// import { v4 } from 'uuid'
import Transactions, {
  TransactionActionType,
  TransactionStatusType,
  TransactionTransferType,
  TransactionWalletType,
  transactionWalletType,
} from '../../models/transactions'
import { generateTransactionString } from '../../utils/helpers'

interface TransactionI {
  senderWalletId?: string
  receiverWalletId?: string
  senderName?: string
  receiverName?: string
  walletType: TransactionWalletType
  walletId: string
  amount: number
  action: TransactionActionType
  status: TransactionStatusType
  transferType: TransactionTransferType
}

export const createTransaction = async ({
  walletType,
  amount,
  walletId,
  action,
  status,
  transferType,
  senderWalletId,
  receiverWalletId,
  senderName,
  receiverName,
}: TransactionI) => {
  if ((senderWalletId && senderName) || (receiverWalletId && receiverName)) {
    const transactionData = {
      id: generateTransactionString(),
      walletId,
      walletType: transactionWalletType[walletType],
      transferType,
      amount,
      status,
      action,
      description: '',
      createdAt: new Date(),
    }

    if (senderWalletId && senderName) {
      return await Transactions.create({
        ...transactionData,
        senderWalletId,
        senderName,
      })
    } else if (receiverWalletId && receiverName) {
      return await Transactions.create({
        ...transactionData,
        receiverWalletId,
        receiverName,
      })
    }
  } else {
    throw new Error(
      'Provide either senderWalletId and senderName or receiverWalletId and receiverName'
    )
  }
}
