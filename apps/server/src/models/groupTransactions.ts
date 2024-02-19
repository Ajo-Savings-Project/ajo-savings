import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize'
import { db } from '../config'
import Groups from './groups'

const TABLE_NAME = 'GroupTransactions'

// https://sequelize.org/docs/v6/other

class GroupTransactions extends Model<
  InferAttributes<GroupTransactions>,
  InferCreationAttributes<GroupTransactions>
> {
  declare transactionId: string
  declare groupId: string
  declare amount: number
  declare transactionType: string
  declare dateInitiated: string
}

GroupTransactions.init(
  {
    transactionId: {
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
    amount: {
      type: DataTypes.INTEGER,
    },
    transactionType: {
      type: DataTypes.STRING,
    },
    dateInitiated: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: db,
    modelName: TABLE_NAME,
    timestamps: true,
  }
)

GroupTransactions.belongsTo(Groups, {
  foreignKey: 'groupId',
})

export default GroupTransactions
