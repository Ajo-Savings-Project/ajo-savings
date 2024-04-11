import { Model, DataTypes } from 'sequelize'
import { db } from '../config'
import Users from './users'

const TABLE_NAME = 'Payments'

export class Payment extends Model {
  public id!: string
  public userId!: string
  public reference!: string
  public amount!: number
  public email!: string
  public fullName!: string
}

Payment.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      references: {
        model: Users,
        key: 'id',
      },
    },
    reference: {
      type: DataTypes.STRING,
      unique: true,
    },
    amount: {
      type: DataTypes.INTEGER,
    },
    email: {
      type: DataTypes.STRING,
    },
    fullName: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: db,
    modelName: TABLE_NAME,
  }
)

export default Payment
