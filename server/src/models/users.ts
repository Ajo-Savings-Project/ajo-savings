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
  created_at: Date
  gender: string
  occupation: string
  date_of_birth: Date
  bvn: string
  address: string
  identification_number: string
  identification_doc: string
  proof_of_address_doc: string
  otp: string | null
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
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    otp: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    role: {
      type: DataTypes.ENUM(...Object.values(role)),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
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
      allowNull: false,
      defaultValue: DataTypes.DATE,
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
  }
)

export default Users
