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
  declare adminId: string
  declare userId: string
  declare firstName: string
  declare lastName: string
  declare profilePic: CreationOptional<string>
  declare amountContributed: number
  declare dateOfLastContribution: string | null
  declare isAdmin: boolean
  declare totalAmountWithdrawnByUser: number
}

GroupMembers.init(
  {
    adminId: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      references: {
        model: Users,
        key: 'id',
      },
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profilePic: {
      type: DataTypes.STRING,
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
  },
  {
    sequelize: db,
    modelName: TABLE_NAME,
    timestamps: true,
  }
)

GroupMembers.belongsTo(Groups, {
  foreignKey: 'adminId',
})

export default GroupMembers
