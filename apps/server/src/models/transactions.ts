import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize'
import { db } from '../config'
import Wallets from './wallets'
import Users from './users'

const TABLE_NAME = 'Transactions'

export enum action {
  DEBIT = 'Debit',
  CREDIT = 'Credit',
}

export enum transaction_status {
  SUCCESSFUL = 'Successful',
  PENDING = 'Pending',
  UNSUCCESSFUL = 'Unsuccessful',
}

export enum transaction_type {
  GLOBAL = 'Global',
  SAVINGS = 'Savings',
  GROUP_WALLET = 'Group Wallet',
}

class Transactions extends Model<
  InferAttributes<Transactions>,
  InferCreationAttributes<Transactions>
> {
  static transaction: never
  declare id: string
  declare wallet_id: string
  declare owner_id: string
  declare amount: number
  declare status: string
  declare action: string
  declare type: string
  declare receiver: string
  declare created_at: Date
}

Transactions.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    wallet_id: {
      type: DataTypes.UUID,
      references: {
        model: Wallets,
        key: 'id',
      },
    },
    owner_id: {
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
      type: DataTypes.ENUM(...Object.values(transaction_status)),
      allowNull: false,
    },
    action: {
      type: DataTypes.ENUM(...Object.values(action)),
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM(...Object.values(transaction_type)),
      allowNull: false,
    },
    receiver: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
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
