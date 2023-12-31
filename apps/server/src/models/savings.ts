import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize'
import { db } from '../config'
import Users from './users'

const TABLE_NAME = 'Savings'

// https://sequelize.org/docs/v6/other

export enum frequency {
  DAILY = 'Daily',
  WEEKLY = 'Weekly',
  MONTHLY = 'Monthly',
  ANNUALLY = 'Annually',
}

enum category {
  TRAVEL = 'Travel',
  DREAM_HOME = 'Dream_Home',
  DREAM_CAR = 'Dream_Car',
  RENT = 'Rent',
  GADGETS = 'Gadgets',
  OTHER = 'Other',
}

class Savings extends Model<
  InferAttributes<Savings>,
  InferCreationAttributes<Savings>
> {
  declare id: string
  declare user_id: string
  declare name: string
  declare target: string
  declare target_amount: number
  declare amount_saved: number
  declare frequency: string
  declare category: string
  declare startDate: string
  declare endDate: string
  declare created_at: Date
}

Savings.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.UUID,
      references: {
        model: Users,
        key: 'id',
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    target: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    frequency: {
      type: DataTypes.ENUM(...Object.values(frequency)),
      allowNull: false,
    },
    category: {
      type: DataTypes.ENUM(...Object.values(category)),
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    target_amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amount_saved: {
      type: DataTypes.INTEGER,
      allowNull: false,
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

export default Savings
