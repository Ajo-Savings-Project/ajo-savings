import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize'
import { db } from '../config'
import Users from './users'

const TABLE_NAME = 'Groups'

// https://sequelize.org/docs/v6/other

interface GroupTransactions {
  transactionID: string
  dateInitiated: Date
  contributorsID: string
  amount: number
  transactionType: string
}

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

export const duration = {
  DAILY: 'Daily',
  WEEKLY: 'Weekly',
  MONTHLY: 'Monthly',
}

export interface Members {
  user: Pick<Users, 'id' | 'firstName' | 'lastName' | 'profilePic'>
  amountContributed: number
  amountWithdrawn: number
  dateOfLastContribution: Date | null
  isAdmin: boolean
}

class Groups extends Model<
  InferAttributes<Groups>,
  InferCreationAttributes<Groups>
> {
  declare id: string
  declare title: string
  declare description: string
  declare adminId: string
  declare contributionAmount: number
  declare groupImage?: string
  declare amountContributedWithinFrequency: number
  declare groupTransactions: GroupTransactions[]
  declare totalAmountWithdrawn: number
  declare members: (Members | string)[]
  declare availableNumberOfParticipants: number
  declare numberOfParticipants: number
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
      allowNull: true,
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
      references: {
        model: Users,
        key: 'id',
      },
    },
    groupTransactions: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    members: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    amountContributedWithinFrequency: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    contributionAmount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalAmountWithdrawn: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    numberOfParticipants: {
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
