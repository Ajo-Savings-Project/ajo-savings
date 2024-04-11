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
    },
    secret: {
      type: DataTypes.STRING,
    },
    token: {
      type: DataTypes.STRING(3000),
    },
    used: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    sequelize: db,
    modelName: TABLE_NAME,
    timestamps: true,
  }
)

export default TempTokens
