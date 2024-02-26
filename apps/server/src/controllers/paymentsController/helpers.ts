import { v4 } from 'uuid'
import Transactions, {
  TransactionActionType,
  TransactionStatusType,
  TransactionTransferType,
  TransactionWalletType,
  transactionWalletType,
} from '../../models/transactions'
import { generateTransactionString } from '../../utils/helpers'

interface TransactionI {
  senderId: string
  receiverId: string
  walletType: TransactionWalletType
  previousBalance: number
  balance: number
  amount: number
  action: TransactionActionType
  status: TransactionStatusType
  transferType: TransactionTransferType
}

export const createTransaction = async ({
  walletType,
  amount,
  previousBalance,
  balance,
  action,
  status,
  transferType,
  senderId,
  receiverId,
}: TransactionI) => {
  return await Transactions.create({
    id: v4(),
    action,
    previousBalance,
    balance,
    amount,
    status,
    transferType,
    walletType: transactionWalletType[walletType],
    transactionId: generateTransactionString(),
    senderId,
    receiverId,
    description: '',
  })
}
