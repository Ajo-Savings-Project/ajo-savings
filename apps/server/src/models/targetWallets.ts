import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize'
import { db } from '../config'

const TABLE_NAME = 'Target Wallet'

class TargetWallets extends Model<
  InferAttributes<TargetWallets>,
  InferCreationAttributes<TargetWallets>
> {
  declare id: string
  declare targetId: string
  declare amountSaved: number
  declare targetAmount: number
}

TargetWallets.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    targetId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Targets',
        key: 'id',
      },
    },
    amountSaved: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    targetAmount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: TABLE_NAME,
    timestamps: true,
  }
)

export default TargetWallets
