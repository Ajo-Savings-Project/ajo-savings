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

const TABLE_NAME = 'Target Wallet'

class TargetWallets extends Model<
  InferAttributes<TargetWallets>,
  InferCreationAttributes<TargetWallets>
> {
  declare id: string
  declare targetId: string
  declare amountSaved: number
  declare targetAmount: number
  declare userId: string
}

TargetWallets.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    targetId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Targets,
        key: 'id',
      },
    },
    amountSaved: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    targetAmount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
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

Targets.hasOne(TargetWallets, {
  foreignKey: 'targetId',
  onDelete: 'CASCADE',
})
TargetWallets.belongsTo(Targets, {
  foreignKey: 'targetId',
  onDelete: 'CASCADE',
})

TargetWallets.hasMany(Transactions, {
  foreignKey: 'receiverWalletId',
  as: 'reciever',
  onDelete: 'CASCADE',
})
TargetWallets.hasMany(Transactions, {
  foreignKey: 'senderWalletId',
  as: 'sender',
  onDelete: 'CASCADE',
})
TargetWallets.hasMany(Transactions, {
  foreignKey: 'walletId',
  as: 'owner',
  onDelete: 'CASCADE',
})

Transactions.belongsTo(TargetWallets, {
  foreignKey: 'walletId',
})

export default TargetWallets
