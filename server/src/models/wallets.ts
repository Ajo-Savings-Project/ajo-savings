import { Model, DataTypes } from 'sequelize'
import { db } from '../config'
import Users from './users'

export enum type {
  GLOBAL = 'Global',
  SAVINGS = 'Savings',
  GROUP_WALLET = 'Group Wallet',
}

export interface Income {
  date: Date
  amount: number
}

export type WalletAttributes = {
  id: string
  user_id: string
  total_amount: number
  type: string
  created_at: Date
  earnings: Income[]
  total_income: number
}

class Wallets extends Model<WalletAttributes> {}

Wallets.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.UUID,
      references: {
        model: Users,
        key: 'id',
      },
    },
    total_amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total_income: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    earnings: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    type: {
      type: DataTypes.ENUM(...Object.values(type)),
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
    tableName: 'Wallets',
    modelName: 'Wallets',
  }
)

export default Wallets
