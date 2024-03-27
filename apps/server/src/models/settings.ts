import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize'
import { db } from '../config'

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
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
    },
    emailNotification: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    contributionReminder: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    groupJoinRequest: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    twoFactorAuthentication: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    passwordUpdate: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },

    profileVisibility: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    emailPrivacy: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    savingsGroupUpdate: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    personalSavingAlert: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    deactivateAccount: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },

  {
    sequelize: db,
    modelName: TABLE_NAME,
  }
)
export default Settings
