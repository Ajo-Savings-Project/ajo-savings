import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize'
import { db } from '../config'
import Groups from './groups'
import Transactions from './transactions'
import { transactionWalletType, TransactionWalletType } from './transactions'

const TABLE_NAME = 'GroupWallet'

class GroupWallet extends Model<
  InferAttributes<GroupWallet>,
  InferCreationAttributes<GroupWallet>
> {
  declare id: string
  declare groupId: string
  declare balance: number
  declare type: TransactionWalletType
}

GroupWallet.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    groupId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Groups,
        key: 'id',
      },
    },
    balance: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM(...Object.values(transactionWalletType)),
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: TABLE_NAME,
    timestamps: true,
  }
)

GroupWallet.hasMany(Transactions, {
  foreignKey: 'receiverWalletId',
  as: 'reciever',
  onDelete: 'CASCADE',
})
GroupWallet.hasMany(Transactions, {
  foreignKey: 'senderWalletId',
  as: 'sender',
  onDelete: 'CASCADE',
})
GroupWallet.hasMany(Transactions, {
  foreignKey: 'walletId',
  as: 'owner',
  onDelete: 'CASCADE',
})

Transactions.belongsTo(GroupWallet, {
  foreignKey: 'walletId',
})

export default GroupWallet
