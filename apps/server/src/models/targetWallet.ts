import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize'
import { db } from '../config'
import Targets from './targets'
import Users from './users'
import Transactions from './transactions'

const TABLE_NAME = 'TargetWallet'

class TargetWallet extends Model<
  InferAttributes<TargetWallet>,
  InferCreationAttributes<TargetWallet>
> {
  declare id: string
  declare targetId: string
  declare amountSaved: number
  declare targetAmount: number
  declare userId: string
}

TargetWallet.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    targetId: {
      type: DataTypes.UUID,
      references: {
        model: Targets,
        key: 'id',
      },
    },
    amountSaved: {
      type: DataTypes.INTEGER,
    },
    targetAmount: {
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.UUID,
      references: {
        model: Users,
        key: 'id',
      },
    },
  },
  {
    sequelize: db,
    modelName: TABLE_NAME,
    timestamps: true,
  }
)

// TargetWallet.hasMany(Transactions, {
//   foreignKey: 'receiverWalletId',
//   as: 'recievers',
//   onDelete: 'CASCADE',
// })
// TargetWallet.hasMany(Transactions, {
//   foreignKey: 'senderWalletId',
//   as: 'senders',
//   onDelete: 'CASCADE',
// })
TargetWallet.hasMany(Transactions, {
  foreignKey: 'targetWalletId',
  as: 'transactions',
  onDelete: 'CASCADE',
})

Transactions.belongsTo(TargetWallet, {
  foreignKey: 'walletId',
})

export default TargetWallet
