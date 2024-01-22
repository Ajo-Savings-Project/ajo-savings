import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize'
import { db } from '../config'
import Wallets from './wallets'
import Users from './users'

const TABLE_NAME = 'Transactions'

export const action = {
  DEBIT: 'Debit',
  CREDIT: 'Credit',
} as const

export const transactionStatus = {
  SUCCESSFUL: 'Successful',
  PENDING: 'Pending',
  UNSUCCESSFUL: 'Unsuccessful',
} as const

export const transactionType = {
  GLOBAL_TRANSACTIONS: 'Global transactions', //Transactions between global wallet and external source/destination
  SAVINGS_TRANSACTIONS: 'Savings transcations', //Transactions between personal savings wallet and all goals wallets.
  GROUP_TRANSACTIONS: 'Group Wallet Transactions', //Transactions between personal group wallet and all groups wallets.
  INTERNAL_TRANSFER: 'Internal funding', // Transactions between global wallet and other personal wallets(savings, group etc.)
} as const

class Transactions extends Model<
  InferAttributes<Transactions>,
  InferCreationAttributes<Transactions>
> {
  static transaction: never
  declare id: string
  declare walletId: string
  declare ownerId: string
  declare amount: number
  declare status: string
  declare action: string
  declare type: string
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
    walletId: {
      type: DataTypes.UUID,
      references: {
        model: Wallets,
        key: 'id',
      },
    },
    ownerId: {
      type: DataTypes.UUID,
      references: {
        model: Users,
        key: 'id',
      },
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(...Object.values(transactionStatus)),
      allowNull: false,
    },
    action: {
      type: DataTypes.ENUM(...Object.values(action)),
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM(...Object.values(transactionType)),
      allowNull: false,
    },
    receiverId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    senderId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize: db,
    tableName: TABLE_NAME,
    modelName: TABLE_NAME,
  }
)

Transactions.belongsTo(Wallets, {
  foreignKey: 'wallet_id',
})

Transactions.belongsTo(Users, {
  foreignKey: 'owner_id',
})

export default Transactions
