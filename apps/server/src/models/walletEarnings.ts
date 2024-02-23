import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize'
import { db } from '../config'
import Wallets from './wallets'

const TABLE_NAME = 'Earnings'

// https://sequelize.org/docs/v6/other

class Earnings extends Model<
  InferAttributes<Earnings>,
  InferCreationAttributes<Earnings>
> {
  declare id: string
  declare walletId: string
  declare amount: number
  declare date: string
}

Earnings.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    walletId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Wallets',
        key: 'id',
      },
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

Earnings.belongsTo(Wallets, {
  foreignKey: 'walletId',
  constraints: false,
  as: 'earnings',
})

export default Earnings
