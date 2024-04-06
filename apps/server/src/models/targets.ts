import { differenceInDays } from 'date-fns'
import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize'
import { db } from '../config'
import TargetWallets from './targetWallets'
import Users from './users'

const TABLE_NAME = 'Targets'

// https://sequelize.org/docs/v6/other

export const targetFrequencyType = {
  DAILY: 'DAILY',
  WEEKLY: 'WEEKLY',
  MONTHLY: 'MONTHLY',
  ANNUALLY: 'ANNUALLY',
} as const
export type TargetFrequencyType =
  (typeof targetFrequencyType)[keyof typeof targetFrequencyType]

export const targetCategoryType = {
  TRAVEL: 'TRAVEL',
  DREAM_HOME: 'DREAM_HOME',
  DREAM_CAR: 'DREAM_CAR',
  RENT: 'RENT',
  GADGETS: 'GADGETS',
  OTHER: 'OTHER',
} as const
export type TargetCategoryType =
  (typeof targetCategoryType)[keyof typeof targetCategoryType]

class Targets extends Model<
  InferAttributes<Targets>,
  InferCreationAttributes<Targets>
> {
  declare id: string
  declare userId: string
  declare avatar: string
  declare name: string
  declare frequency: TargetFrequencyType
  declare category: string
  declare startDate: string
  declare withdrawalDate: string
  declare daysLeft?: string
}

const getDaysLeft = (withdrawalDate: string) =>
  differenceInDays(new Date(withdrawalDate), new Date())

Targets.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    userId: {
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
    frequency: {
      type: DataTypes.ENUM(...Object.values(targetFrequencyType)),
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.DATE,
    },
    withdrawalDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.DATE,
    },
    daysLeft: {
      type: DataTypes.VIRTUAL,
      get() {
        return getDaysLeft(this.withdrawalDate)
      },
    },
  },
  {
    sequelize: db,
    modelName: TABLE_NAME,
    timestamps: true,
  }
)

Targets.belongsTo(Users, {
  foreignKey: 'userId',
  as: 'user',
  targetKey: 'id',
})

Users.hasMany(Targets, {
  foreignKey: 'userId',
  as: 'target',
})

TargetWallets.belongsTo(Targets, {
  foreignKey: 'targetId',
  as: 'wallet',
})

Targets.hasOne(TargetWallets, {
  foreignKey: 'targetId',
  as: 'wallet',
})

export default Targets
