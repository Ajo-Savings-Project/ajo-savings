import { Model, DataTypes } from 'sequelize'
import { db } from '../config'

export enum role {
  ADMIN = 'Admin',
  CONTRIBUTOR = 'Contributor', //NORMAL USER
}

export type UserAttributes = {
  id: string
  firstName: string
  lastName: string
  email: string
  profilePic: string
  password: string
  role: string
  phone: string
  gender: string
  occupation: string
  date_of_birth?: Date
  bvn: string
  address: string
  identification_number: string
  identification_doc: string
  proof_of_address_doc: string
  otp?: string
  otp_expiry?: Date
  createdAt?: Date
  updatedAt?: Date
}

class Users extends Model<UserAttributes> {}

Users.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profilePic: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    otp: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    otp_expiry: {
      type: DataTypes.DATE,
    },
    role: {
      type: DataTypes.ENUM(...Object.values(role)),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    occupation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date_of_birth: {
      type: DataTypes.DATE,
    },
    bvn: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    identification_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    identification_doc: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    proof_of_address_doc: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: 'Users',
    modelName: 'Users',
    timestamps: false,
  }
)

export default Users
