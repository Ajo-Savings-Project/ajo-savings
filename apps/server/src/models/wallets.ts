import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize'
import { db } from '../config'
import Users from './users'
import Groups from './groups'

const TABLE_NAME = 'Wallets'

// https://sequelize.org/docs/v6/other

export const WalletType = {
  GLOBAL: 'Global Wallet',
  SAVINGS: 'Savings Wallet',
  GROUP_WALLET: 'Group Wallet',
} as const

export const OwnerType = {
  USER: 'user',
  GROUP: 'group',
  SAVINGS_GOAL: 'savings-goal',
} as const

class Wallets extends Model<
  InferAttributes<Wallets>,
  InferCreationAttributes<Wallets>
> {
  declare id: string
  declare ownerId: string
  declare ownerType: 'user' | 'group'
  declare totalAmount: number
  declare type: string
  declare totalIncome: number
}

Wallets.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    ownerId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    ownerType: {
      type: DataTypes.ENUM(...Object.values(OwnerType)),
      allowNull: false,
    },
    totalAmount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalIncome: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    type: {
      type: DataTypes.ENUM(...Object.values(WalletType)),
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: TABLE_NAME,
    timestamps: true,
  }
)

// Associations
Wallets.belongsTo(Users, {
  foreignKey: 'ownerId',
  constraints: false,
  as: 'user',
})
Wallets.belongsTo(Groups, {
  foreignKey: 'ownerId',
  constraints: false,
  as: 'group',
})

export default Wallets
