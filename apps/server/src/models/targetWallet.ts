import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize'
import { db } from '../config'
import Targets from './targets'
import Users from './users'

const TABLE_NAME = 'TargetWallet'

class TargetWallet extends Model<
  InferAttributes<TargetWallet>,
  InferCreationAttributes<TargetWallet>
> {
  declare id: string
  declare targetId: string
  declare amountSaved: number
  declare targetAmount: number
  declare userId: string
}

TargetWallet.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    targetId: {
      type: DataTypes.UUID,
      references: {
        model: Targets,
        key: 'id',
      },
    },
    amountSaved: {
      type: DataTypes.INTEGER,
    },
    targetAmount: {
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.UUID,
      references: {
        model: Users,
        key: 'id',
      },
    },
  },
  {
    sequelize: db,
    modelName: TABLE_NAME,
    timestamps: true,
  }
)

export default TargetWallet
