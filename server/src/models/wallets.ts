import { Model, DataTypes } from 'sequelize'
import { dbConfig } from '../config'
// import Users from "./users";
// import Transactions from "./transactions";

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
  // total_group_savings: number;
  // total_personal_savings: number;
  earnings: Income[]
  total_income: number
}

class Wallets extends Model<WalletAttributes> {
  earnings!: Array<{ date: Date; amount: number }> // Add earnings array
  total_group_savings!: number // this line is throwing error when total_group_savings: number. It should be like this total_group_savings: [] = []. But I used any to stop the error.
  total_personal_savings!: number
  total_amount!: number
  id!: string
  static id: string
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
      // references: {
      //   model: Users,
      //   key: "id",
      // },
    },
    total_amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // total_group_savings: {
    //   type: DataTypes.INTEGER,
    //   allowNull: true
    // },
    total_income: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    // total_personal_savings: {
    //   type: DataTypes.INTEGER,
    //   allowNull: true
    // },
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
    sequelize: dbConfig,
    tableName: 'Wallets',
    modelName: 'Wallets',
  }
)

export default Wallets
