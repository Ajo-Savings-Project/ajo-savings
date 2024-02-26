import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize'
import { db } from '../config'

const TABLE_NAME = 'GroupWallet'

class GroupWallet extends Model<
  InferAttributes<GroupWallet>,
  InferCreationAttributes<GroupWallet>
> {
  declare id: string
  declare ownerId: string
  declare balance: number
}

GroupWallet.init(
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
  },
  {
    sequelize: db,
    modelName: TABLE_NAME,
    timestamps: true,
  }
)

export default GroupWallet
