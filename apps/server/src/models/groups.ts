import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize'
import { db } from '../config'
import GroupWallet from './groupWallet'
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
} as const
export type FrequencyType = (typeof frequencyType)[keyof typeof frequencyType]

class Groups extends Model<
  InferAttributes<Groups>,
  InferCreationAttributes<Groups>
> {
  declare id: string
  declare title: string
  declare description: string
  declare userId: string
  declare recurringAmount: number
  declare groupImage: CreationOptional<string>
  declare amountContributedWithinFrequency: number
  declare totalAmountWithdrawn: number
  declare numberOfPresentParticipants: number
  declare maxNumberOfParticipants: number
  declare frequency: FrequencyType
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
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users',
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
    numberOfPresentParticipants: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    frequency: {
      type: DataTypes.ENUM(...Object.values(frequencyType)),
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
  foreignKey: 'userId',
  as: 'user',
})

Groups.belongsTo(GroupWallet, {
  foreignKey: 'userId',
  as: 'groupWallet',
  targetKey: 'id',
})
export default Groups
