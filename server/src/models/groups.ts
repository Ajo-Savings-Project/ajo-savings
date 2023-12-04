import { Model, DataTypes } from 'sequelize'
import { db } from '../config'
import Users from './users'

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
  member_picture: string
  member_id: string
  name: string
  amount_contributed: number
  amount_withdrawn: number
  date_of_last_contribution: Date
  profilePicture?: string
}
export type GroupAttributes = {
  id: string
  title: string
  description: string
  admin_id: string
  group_image?: string
  amount_contributed?: number
  contribution_amount: number
  group_transactions: GroupTransactions[]
  amount_withdrawn: number
  members: Members[]
  slots: number[]
  availableSlots: number[]
  number_of_participants: number
  frequency: string
  duration: string
  startDate: Date
  endDate: Date
  created_at: Date
}

class Groups extends Model<GroupAttributes> {}

Groups.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    group_image: {
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
    admin_id: {
      type: DataTypes.UUID,
      references: {
        model: Users,
        key: 'id',
      },
    },
    group_transactions: {
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
    amount_contributed: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    contribution_amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amount_withdrawn: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    number_of_participants: {
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
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize: db,
    tableName: 'Groups',
    modelName: 'Groups',
  }
)

export default Groups
