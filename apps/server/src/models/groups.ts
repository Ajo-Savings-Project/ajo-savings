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
  declare adminId: string
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
    },
    groupImage: {
      type: DataTypes.STRING,
    },
    title: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
      field: 'Content of the post',
    },
    adminId: {
      type: DataTypes.UUID,
      references: {
        model: Users,
        key: 'id',
      },
    },
    amountContributedWithinFrequency: {
      type: DataTypes.INTEGER,
    },
    recurringAmount: {
      type: DataTypes.INTEGER,
    },
    totalAmountWithdrawn: {
      type: DataTypes.INTEGER,
    },
    maxNumberOfParticipants: {
      type: DataTypes.INTEGER,
    },
    numberOfPresentParticipants: {
      type: DataTypes.INTEGER,
    },
    frequency: {
      type: DataTypes.ENUM(...Object.values(frequencyType)),
    },
  },
  {
    sequelize: db,
    modelName: TABLE_NAME,
    timestamps: true,
  }
)

Groups.belongsTo(Users, {
  foreignKey: 'adminId',
  as: 'user',
  targetKey: 'id',
})

Users.hasMany(Groups, {
  foreignKey: 'adminId',
  as: 'user',
})

GroupWallet.belongsTo(Groups, {
  foreignKey: 'groupId',
})

Groups.hasOne(GroupWallet, {
  foreignKey: 'groupId',
})

export default Groups
