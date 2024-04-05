import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize'
import { db } from '../config'
import Users from './users'
import Transactions from './transactions'

const TABLE_NAME = 'Wallet'

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
      allowNull: false,
    },
    userId: {
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
UserWallet.belongsTo(Users, {
  foreignKey: 'userId',
  constraints: false,
})
Users.hasOne(UserWallet, {
  foreignKey: 'userId',
})

UserWallet.hasMany(Transactions, {
  foreignKey: 'receiverWalletId',
  as: 'reciever',
  onDelete: 'CASCADE',
})
UserWallet.hasMany(Transactions, {
  foreignKey: 'senderWalletId',
  as: 'sender',
  onDelete: 'CASCADE',
})
UserWallet.hasMany(Transactions, {
  foreignKey: 'walletId',
  as: 'owner',
  onDelete: 'CASCADE',
})

Transactions.belongsTo(UserWallet, {
  foreignKey: 'walletId',
})

export default UserWallet
