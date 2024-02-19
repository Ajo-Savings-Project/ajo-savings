import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize'
import { db } from '../config'
import GroupTransactions from './groupTransactions'

const TABLE_NAME = 'GroupContributors'

// https://sequelize.org/docs/v6/other

class GroupContributors extends Model<
  InferAttributes<GroupContributors>,
  InferCreationAttributes<GroupContributors>
> {
  declare contributorsId: string
  declare groupId: string
}

GroupContributors.init(
  {
    contributorsId: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    groupId: {
      type: DataTypes.UUID,
      references: {
        model: 'Groups',
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

GroupContributors.belongsTo(GroupTransactions, {
  foreignKey: 'groupId',
})

export default GroupContributors
