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
  member_picture: string
  member_id: string
  name: string
  amount_contributed: number
  amount_withdrawn: number
  date_of_last_contribution: Date
  profilePicture?: string
}

class Groups extends Model<
  InferAttributes<Groups>,
  InferCreationAttributes<Groups>
> {
  declare id: string
  declare title: string
  declare description: string
  declare admin_id: string
  declare group_image?: string
  declare amount_contributed?: number
  declare contribution_amount: number
  declare group_transactions: GroupTransactions[]
  declare amount_withdrawn: number
  declare members: Members[]
  declare slots: number[]
  declare availableSlots: number[]
  declare number_of_participants: number
  declare frequency: string
  declare duration: string
  declare startDate: Date
  declare endDate: Date
  declare created_at: Date
}

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
    tableName: TABLE_NAME,
    modelName: TABLE_NAME,
  }
)

export default Groups
