import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize'
import { db } from '../config'

const TABLE_NAME = 'Earnings'

// https://sequelize.org/docs/v6/other

class Earnings extends Model<
  InferAttributes<Earnings>,
  InferCreationAttributes<Earnings>
> {
  declare walletId: string
  declare amount: number
  declare date: string
}

Earnings.init(
  {
    walletId: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: db,
    modelName: TABLE_NAME,
    timestamps: true,
  }
)

export default Earnings
