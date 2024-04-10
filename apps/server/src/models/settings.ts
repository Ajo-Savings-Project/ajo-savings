import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize'
import { db } from '../config'
import Users from './users'

const TABLE_NAME = 'Settings'

class Settings extends Model<
  InferAttributes<Settings>,
  InferCreationAttributes<Settings>
> {
  declare id: string
  declare userId: string
  declare emailNotification?: boolean
  declare contributionReminder?: boolean
  declare groupJoinRequest?: boolean
  declare twoFactorAuthentication?: boolean
  declare passwordUpdate?: boolean
  declare profileVisibility?: boolean
  declare emailPrivacy?: boolean
  declare savingsGroupUpdate?: boolean
  declare personalSavingAlert?: boolean
  declare deactivateAccount?: boolean
}

Settings.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      references: {
        model: Users,
        key: 'id',
      },
    },
    emailNotification: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    contributionReminder: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    groupJoinRequest: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    twoFactorAuthentication: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    passwordUpdate: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    profileVisibility: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    emailPrivacy: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    savingsGroupUpdate: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    personalSavingAlert: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    deactivateAccount: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },

  {
    sequelize: db,
    modelName: TABLE_NAME,
  }
)
export default Settings
