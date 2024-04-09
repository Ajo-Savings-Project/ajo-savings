import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
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
  declare groupTitle: string
  declare amountContributed: number
  declare dateOfLastContribution: CreationOptional<string | null>
  declare totalAmountWithdrawnByUser: number
  declare isAdmin: boolean
  declare sequence: number
}

GroupMembers.init(
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
    userId: {
      type: DataTypes.UUID,
      references: {
        model: Users,
        key: 'id',
      },
    },
    groupTitle: {
      type: DataTypes.STRING,
    },
    amountContributed: {
      type: DataTypes.INTEGER,
    },
    totalAmountWithdrawnByUser: {
      type: DataTypes.INTEGER,
    },
    dateOfLastContribution: {
      type: DataTypes.STRING,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
    },
    sequence: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize: db,
    modelName: TABLE_NAME,
    timestamps: true,
  }
)

GroupMembers.belongsTo(Users, {
  foreignKey: 'userId',
  as: 'user',
})

Users.hasMany(GroupMembers, {
  foreignKey: 'userId',
  as: 'users',
})

GroupMembers.belongsTo(Groups, {
  foreignKey: 'groupId',
  as: 'groupMember',
})

Groups.hasMany(GroupMembers, {
  foreignKey: 'groupId',
  as: 'groupMembers',
})
export default GroupMembers
