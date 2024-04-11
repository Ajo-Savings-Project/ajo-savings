import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize'
import { db } from '../config'
import UserWallet from './userWallet'
// import GroupWallet from './groupWallet'
import TargetWallet from './targetWallet'

const TABLE_NAME = 'Transactions'

export const transactionWalletType = {
  GLOBAL: 'GLOBAL',
  SAVINGS: 'SAVINGS',
  GROUP: 'GROUP',
} as const
export type TransactionWalletType =
  (typeof transactionWalletType)[keyof typeof transactionWalletType]

export const transactionActionType = {
  DEBIT: 'DEBIT',
  CREDIT: 'CREDIT',
} as const
export type TransactionActionType =
  (typeof transactionActionType)[keyof typeof transactionActionType]

export const transactionStatusType = {
  SUCCESSFUL: 'SUCCESSFUL',
  PENDING: 'PENDING',
  UNSUCCESSFUL: 'UNSUCCESSFUL',
} as const
export type TransactionStatusType =
  (typeof transactionStatusType)[keyof typeof transactionStatusType]

export const transactionTransferType = {
  //Transactions between global wallet and external source/destination
  GLOBAL_TRANSACTIONS: 'GLOBAL_TRANSACTIONS',
  //Transactions between global wallet and all goals wallets.
  SAVING_GOALS_TRANSACTIONS: 'SAVINGS_GOALS',
  //Transactions between global wallet and all groups wallets.
  GROUP_TRANSACTIONS: 'GROUP_TRANSACTIONS',
  // Transactions between global wallet and other personal wallets(savings, group etc.)
  INTERNAL_TRANSFERS: 'INTERNAL_TRANSFERS',
  // Transactions between users
  PAY_STACK: 'PAY_STACK',
} as const
export type TransactionTransferType =
  (typeof transactionTransferType)[keyof typeof transactionTransferType]

class Transactions extends Model<
  InferAttributes<Transactions>,
  InferCreationAttributes<Transactions>
> {
  declare id: string
  declare userWalletId: CreationOptional<string>
  declare groupWalletId: CreationOptional<string>
  declare targetWalletId: CreationOptional<string>
  declare walletType: TransactionWalletType
  declare transferType: TransactionTransferType
  declare amount: number
  declare status: TransactionStatusType
  declare description: CreationOptional<string>
  declare action: TransactionActionType
  declare receiverWalletId: CreationOptional<string>
  declare senderWalletId: CreationOptional<string>
  declare receiverName: CreationOptional<string>
  declare senderName: CreationOptional<string>
  declare createdAt: Date
}

Transactions.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    userWalletId: {
      type: DataTypes.UUID,
      references: {
        model: UserWallet,
        key: 'id',
      },
    },
    groupWalletId: {
      type: DataTypes.UUID,
      // references: {
      //   model: GroupWallet,
      //   key: 'id',
      // },
    },
    targetWalletId: {
      type: DataTypes.UUID,
      references: {
        model: TargetWallet,
        key: 'id',
      },
    },
    walletType: {
      type: DataTypes.ENUM(...Object.values(transactionWalletType)),
    },
    transferType: {
      type: DataTypes.ENUM(...Object.values(transactionTransferType)),
    },
    amount: {
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.ENUM(...Object.values(transactionStatusType)),
    },
    description: {
      type: DataTypes.STRING,
    },
    action: {
      type: DataTypes.ENUM(...Object.values(transactionActionType)),
    },
    receiverWalletId: {
      type: DataTypes.UUID,
    },
    senderWalletId: {
      type: DataTypes.UUID,
    },
    receiverName: {
      type: DataTypes.STRING,
    },
    senderName: {
      type: DataTypes.STRING,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
  },
  {
    timestamps: true,
    sequelize: db,
    modelName: TABLE_NAME,
  }
)

export default Transactions
