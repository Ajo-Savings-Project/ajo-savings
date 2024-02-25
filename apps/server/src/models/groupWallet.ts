import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize'
import { db } from '../config'
import Groups from './groups'

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

// Associations
GroupWallet.belongsTo(Groups, {
  foreignKey: 'ownerId',
})

export default GroupWallet
