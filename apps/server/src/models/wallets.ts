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

export enum type {
  GLOBAL = 'Global',
  SAVINGS = 'Savings',
  GROUP_WALLET = 'Group Wallet',
}

export interface Income {
  date: Date
  amount: number
}

class Wallets extends Model<
  InferAttributes<Wallets>,
  InferCreationAttributes<Wallets>
> {
  declare id: string
  declare user_id: string
  declare total_amount: number
  declare type: string
  declare created_at: Date
  declare earnings: Income[]
  declare total_income: number
}

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
    tableName: TABLE_NAME,
    modelName: TABLE_NAME,
  }
)

export default Wallets
