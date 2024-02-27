import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize'
import { db } from '../config'

const TABLE_NAME = 'UserVerifyEmail'

class UserVerifyEmail extends Model<
  InferAttributes<UserVerifyEmail>,
  InferCreationAttributes<UserVerifyEmail>
> {
  declare id: string
  declare user: string
  declare token: string
}

UserVerifyEmail.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    user: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: TABLE_NAME,
  }
)

export default UserVerifyEmail
