import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize'
import { db } from '../config'

const TABLE_NAME = 'Groups'

// https://sequelize.org/docs/v6/other

// contribution rate
export const frequency = {
  DAILY: 'Daily',
  WEEKLY: 'Weekly',
  MONTHLY: 'Monthly',
}

export const cashOutDuration = {
  DAILY: 'Daily',
  WEEKLY: 'Weekly',
  MONTHLY: 'Monthly',
}

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
  declare availableNumberOfParticipants: number
  declare maxNumberOfParticipants: number
  declare frequency: string
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
    adminId: {
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
    availableNumberOfParticipants: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    frequency: {
      type: DataTypes.ENUM(...Object.values(frequency)),
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

export default Groups
