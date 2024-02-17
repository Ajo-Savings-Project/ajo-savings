import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize'
import { db } from '../config'

const TABLE_NAME = 'UserResetPasswordToken'

class UserResetPasswordToken extends Model<
  InferAttributes<UserResetPasswordToken>,
  InferCreationAttributes<UserResetPasswordToken>
> {
  declare id: string
  declare secret: string
  declare token: string
  declare used: boolean
}

UserResetPasswordToken.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    secret: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    used: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize: db,
    modelName: TABLE_NAME,
    timestamps: true,
  }
)

export default UserResetPasswordToken
