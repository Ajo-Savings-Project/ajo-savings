import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize'
import { db } from '../config'
import Users from './users'

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
    },
    userId: {
      type: DataTypes.UUID,
      references: {
        model: Users,
        key: 'id',
      },
    },
    groupId: {
      type: DataTypes.UUID,
      references: {
        model: 'Groups',
        key: 'id',
      },
    },
    transactionId: {
      type: DataTypes.STRING,
      references: {
        model: 'Transactions',
        key: 'id',
      },
    },
    amount: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize: db,
    modelName: TABLE_NAME,
    timestamps: true,
  }
)

export default GroupContributions
