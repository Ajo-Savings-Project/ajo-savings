import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize'
import { db } from '../config'
import Groups from './groups'
import Users from './users'

const TABLE_NAME = 'GroupMembers'

class GroupMembers extends Model<
  InferAttributes<GroupMembers>,
  InferCreationAttributes<GroupMembers>
> {
  declare id: string
  declare groupId: string
  declare userId: string
  declare amountContributed: number
  declare dateOfLastContribution: string | null
  declare totalAmountWithdrawnByUser: number
}

GroupMembers.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    groupId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Groups,
        key: 'id',
      },
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Users,
        key: 'id',
      },
    },
    amountContributed: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalAmountWithdrawnByUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    dateOfLastContribution: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: db,
    modelName: TABLE_NAME,
    timestamps: true,
  }
)

GroupMembers.belongsTo(Groups, {
  foreignKey: 'groupId',
  as: 'group',
})

GroupMembers.belongsTo(Users, {
  foreignKey: 'userId',
  as: 'user',
})

export default GroupMembers
