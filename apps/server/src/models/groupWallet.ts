import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize'
import { db } from '../config'
import Groups from './groups'
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
    },
    groupId: {
      type: DataTypes.UUID,
      references: {
        model: Groups,
        key: 'id',
      },
    },
    balance: {
      type: DataTypes.INTEGER,
    },
    type: {
      type: DataTypes.ENUM(...Object.values(transactionWalletType)),
    },
  },
  {
    sequelize: db,
    modelName: TABLE_NAME,
    timestamps: true,
  }
)

export default GroupWallet
