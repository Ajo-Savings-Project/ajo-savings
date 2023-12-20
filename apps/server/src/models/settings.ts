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
  declare owner_id: string
  declare email_notification?: boolean
  declare contribution_reminder?: boolean
  declare group_join_request?: boolean
  declare two_factor_authentication?: boolean
  declare password_update?: boolean
  declare profile_visibility?: boolean
  declare email_privacy?: boolean
  declare savings_group_update?: boolean
  declare personal_saving_alert?: boolean
  declare deactivate_account?: boolean
}

Settings.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    owner_id: {
      type: DataTypes.UUID,
    },
    email_notification: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    contribution_reminder: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    group_join_request: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    two_factor_authentication: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    password_update: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },

    profile_visibility: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    email_privacy: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    savings_group_update: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    personal_saving_alert: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    deactivate_account: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },

  {
    sequelize: db,
    tableName: TABLE_NAME,
    modelName: TABLE_NAME,
  }
)
export default Settings
