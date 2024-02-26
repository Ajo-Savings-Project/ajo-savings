import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize'
import { db } from '../config'
import Users from './users'

const TABLE_NAME = 'Wallet'

// https://sequelize.org/docs/v6/other

export const walletType = {
  GLOBAL: 'GLOBAL',
  SAVINGS: 'SAVINGS',
} as const
export type WalletType = (typeof walletType)[keyof typeof walletType]

class Wallets extends Model<
  InferAttributes<Wallets>,
  InferCreationAttributes<Wallets>
> {
  declare id: string
  declare ownerId: string
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

export default Wallets
