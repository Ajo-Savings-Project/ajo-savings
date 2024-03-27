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
    reference: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    admin_id: {
      type: DataTypes.UUID,
      references: {
        model: Users,
        key: 'id',
      },
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
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
