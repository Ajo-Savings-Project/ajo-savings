import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize'
import { db } from '../config'
import Users from './users'

const TABLE_NAME = 'Groups'

/**
 * Supported frequency types
 * @type {{WEEKLY: string, DAILY: string, MONTHLY: string}}
 */
export const frequencyType = {
  DAILY: 'DAILY',
  WEEKLY: 'WEEKLY',
  MONTHLY: 'MONTHLY',
}
export type FrequencyType = (typeof frequencyType)[keyof typeof frequencyType]

class Groups extends Model<
  InferAttributes<Groups>,
  InferCreationAttributes<Groups>
> {
  declare id: string
  declare title: string
  declare description: string
  declare ownerId: string
  declare recurringAmount: number
  declare groupImage: CreationOptional<string>
  declare amountContributedWithinFrequency: number
  declare totalAmountWithdrawn: number
  declare availableNumberOfParticipants: number
  declare maxNumberOfParticipants: number
  declare frequency: FrequencyType
  declare duration: string
}

Groups.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    groupImage: {
      type: DataTypes.STRING,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      field: 'Content of the post',
      allowNull: false,
    },
    ownerId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Users,
        key: 'id',
      },
    },
    amountContributedWithinFrequency: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    recurringAmount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalAmountWithdrawn: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    maxNumberOfParticipants: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    availableNumberOfParticipants: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    frequency: {
      type: DataTypes.ENUM(...Object.values(frequencyType)),
      allowNull: false,
    },
    duration: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: TABLE_NAME,
    timestamps: true,
  }
)

Groups.belongsTo(Users, {
  foreignKey: 'ownerId',
  as: 'user',
})
export default Groups
