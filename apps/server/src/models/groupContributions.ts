import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize'
import { db } from '../config'

const TABLE_NAME = 'GroupContributions'

// https://sequelize.org/docs/v6/other

class GroupContributions extends Model<
  InferAttributes<GroupContributions>,
  InferCreationAttributes<GroupContributions>
> {
  declare id: string
  declare userId: string
  declare groupId: string
  declare amount: number
  declare transactionId: string
}

GroupContributions.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    groupId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Groups',
        key: 'id',
      },
    },
    transactionId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'Transactions',
        key: 'id',
      },
    },
    amount: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: TABLE_NAME,
    timestamps: true,
  }
)

export default GroupContributions
