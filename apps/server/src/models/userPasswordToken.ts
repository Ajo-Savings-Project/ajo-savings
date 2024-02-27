import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize'
import { db } from '../config'

const TABLE_NAME = 'TempTokens'

class TempTokens extends Model<
  InferAttributes<TempTokens>,
  InferCreationAttributes<TempTokens>
> {
  declare id: string
  declare secret: string
  declare token: string
  declare used: boolean
}

TempTokens.init(
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
      type: DataTypes.TEXT,
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

export default TempTokens
