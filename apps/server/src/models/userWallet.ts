import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize'
import { db } from '../config'
import Users from './users'

const TABLE_NAME = 'UserWallet'

// https://sequelize.org/docs/v6/other

export const walletType = {
  GLOBAL: 'GLOBAL',
  SAVINGS: 'SAVINGS',
} as const
export type WalletType = (typeof walletType)[keyof typeof walletType]

class UserWallet extends Model<
  InferAttributes<UserWallet>,
  InferCreationAttributes<UserWallet>
> {
  declare id: string
  declare userId: string
  declare balance: number
  declare type: WalletType
}

UserWallet.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      references: {
        model: Users,
        key: 'id',
      },
    },
    balance: {
      type: DataTypes.INTEGER,
    },
    type: {
      type: DataTypes.ENUM(...Object.values(walletType)),
    },
  },
  {
    sequelize: db,
    modelName: TABLE_NAME,
    timestamps: true,
  }
)

export default UserWallet
