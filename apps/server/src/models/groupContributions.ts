import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize'
import { db } from '../config'
import Groups from './groups'
import GroupTransactions from './groupTransactions'
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
    transactionId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.NUMBER,
      allowNull: false,
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
        model: Groups,
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

GroupContributions.belongsTo(GroupTransactions, {
  foreignKey: 'groupId',
})

export default GroupContributions
