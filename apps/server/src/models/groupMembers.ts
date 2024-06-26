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
      allowNull: false,
    },
    groupId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Groups',
        key: 'id',
      },
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    groupTitle: {
      type: DataTypes.STRING,
      allowNull: false,
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
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    sequence: {
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

GroupMembers.belongsTo(Users, {
  foreignKey: 'userId',
  as: 'user',
})

GroupMembers.belongsTo(Groups, {
  foreignKey: 'groupId',
})
Groups.hasMany(GroupMembers, {
  foreignKey: 'groupId',
})
export default GroupMembers
