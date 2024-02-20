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

export const walletType = {
  GLOBAL: 'global',
  SAVINGS: 'savings',
  GROUP_WALLET: 'group',
} as const
export type WalletType = (typeof walletType)[keyof typeof walletType]

export const ownerType = {
  USER: 'user',
  GROUP: 'group',
} as const
export type OwnerType = (typeof ownerType)[keyof typeof ownerType]

class Wallets extends Model<
  InferAttributes<Wallets>,
  InferCreationAttributes<Wallets>
> {
  declare id: string
  declare ownerId: string
  declare ownerType: OwnerType
  declare balance: number
  declare type: WalletType
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
      type: DataTypes.ENUM(...Object.values(ownerType)),
      allowNull: false,
    },
    balance: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM(...Object.values(walletType)),
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
