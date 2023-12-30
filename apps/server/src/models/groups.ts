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
  transaction_id: string
  date_initiated: Date
  contributors_id: string
  amount: number
  transaction_type: string
}

enum frequency {
  DAILY = 'Daily',
  WEEKLY = 'Weekly',
  MONTHLY = 'Monthly',
}

export interface Members {
  memberPicture: string | null
  memberId: string
  name: string
  amountContributed: number
  amountWithdrawn: number
  dateOfLastContribution: Date
  profilePicture?: string | null
}

class Groups extends Model<
  InferAttributes<Groups>,
  InferCreationAttributes<Groups>
> {
  declare id: string
  declare title: string
  declare description: string
  declare adminId: string
  declare groupImage?: string
  declare amountContributed?: number
  declare contributionAmount: number
  declare groupTransactions: GroupTransactions[]
  declare amountWithdrawn: number
  declare members: Members[]
  declare slots: number[]
  declare availableSlots: number[]
  declare numberOfParticipants: number
  declare frequency: string
  declare duration: string
  declare startDate: Date
  declare endDate: Date
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
    slots: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: true,
    },
    availableSlots: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: true,
    },
    amountContributed: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    contributionAmount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amountWithdrawn: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    numberOfParticipants: {
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
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.DATE,
    },
    // createdAt: {
    //   type: DataTypes.DATE,
    //   allowNull: false,
    //   defaultValue: DataTypes.NOW,
    // },
  },
  {
    sequelize: db,
    tableName: TABLE_NAME,
    modelName: TABLE_NAME,
    timestamps: true,
  }
)

export default Groups
