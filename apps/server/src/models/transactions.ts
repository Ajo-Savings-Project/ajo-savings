import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize'
import { db } from '../config'
import Groups from './groups'
import { walletType } from './wallets'

const TABLE_NAME = 'Transactions'

export const transactionWalletType = { ...walletType, GROUP: 'GROUP' } as const
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
  //Transactions between personal savings wallet and all goals wallets.
  SAVINGS_TRANSACTIONS: 'SAVINGS_TRANSACTIONS',
  //Transactions between personal group wallet and all groups wallets.
  GROUP_TRANSACTIONS: 'GROUP_TRANSACTIONS',
  // Transactions between global wallet and other personal wallets(savings, group etc.)
  INTERNAL_TRANSFERS: 'INTERNAL_TRANSFERS',
} as const
export type TransactionTransferType =
  (typeof transactionTransferType)[keyof typeof transactionTransferType]

class Transactions extends Model<
  InferAttributes<Transactions>,
  InferCreationAttributes<Transactions>
> {
  declare id: string
  declare transactionId: string
  declare walletType: TransactionWalletType
  declare transferType: TransactionTransferType
  declare balance: number
  declare amount: number
  declare previousBalance: number
  declare status: TransactionStatusType
  declare description: CreationOptional<string>
  declare action: TransactionActionType
  declare receiverId: CreationOptional<string>
  declare senderId: CreationOptional<string>
}

Transactions.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    balance: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    previousBalance: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    walletType: {
      type: DataTypes.ENUM(...Object.values(transactionWalletType)),
      allowNull: false,
    },
    transactionId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    transferType: {
      type: DataTypes.ENUM(...Object.values(transactionTransferType)),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(...Object.values(transactionStatusType)),
      allowNull: false,
    },
    action: {
      type: DataTypes.ENUM(...Object.values(transactionActionType)),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    receiverId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    senderId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    sequelize: db,
    modelName: TABLE_NAME,
  }
)

Groups.hasMany(Transactions, {
  foreignKey: 'receiverId',
  as: 'transactions',
  constraints: false,
  onDelete: 'CASCADE',
})

export default Transactions
