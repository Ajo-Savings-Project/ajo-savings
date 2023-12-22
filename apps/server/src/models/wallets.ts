import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize'
import { db } from '../config'
import Users from './users'

const TABLE_NAME = 'Wallets'

// https://sequelize.org/docs/v6/other

export enum WalletType {
  GLOBAL = 'Global',
  SAVINGS = 'Savings',
  GROUP_WALLET = 'Group Wallet',
}

// const WalletType = ['Global', 'Savings', 'Group Wallet'] as const

export interface Income {
  date: Date
  amount: number
}

class Wallets extends Model<
  InferAttributes<Wallets>,
  InferCreationAttributes<Wallets>
> {
  declare id: string
  declare userId: string
  declare totalAmount: number
  declare type: string
  declare earnings: Income[]
  declare totalIncome: number
}

Wallets.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      references: {
        model: Users,
        key: 'id',
      },
    },
    totalAmount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalIncome: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    earnings: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    type: {
      type: DataTypes.ENUM(...Object.values(WalletType)),
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: TABLE_NAME,
    modelName: TABLE_NAME,
    timestamps: true,
  }
)

export default Wallets
