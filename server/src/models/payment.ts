import { Model, DataTypes } from 'sequelize'
import { db } from '../config'
import Users from './users'

export class Payment extends Model {
  public id!: string
  public owner_id!: string
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
    tableName: 'payments',
  }
)

export default Payment
