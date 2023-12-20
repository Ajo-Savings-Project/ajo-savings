import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize'
import { db } from '../config'

export enum role {
  ADMIN = 'Admin',
  CONTRIBUTOR = 'Contributor', //NORMAL USER
}

const TABLE_NAME = 'Users'

// https://sequelize.org/docs/v6/other-topics/typescript/
class Users extends Model<
  InferAttributes<Users>,
  InferCreationAttributes<Users>
> {
  declare id: string
  declare firstName: string
  declare lastName: string
  declare email: string
  declare profilePic: string | null
  declare password: string
  declare role: string
  declare phone: string
  declare gender: string | null
  declare occupation: string | null
  declare date_of_birth: CreationOptional<Date>
  declare bvn: string | null
  declare address: string | null
  declare identification_number: string
  declare identification_doc: string
  declare proof_of_address_doc: string | null
  declare otp: CreationOptional<string>
  declare otp_expiry: CreationOptional<Date>
  declare resetToken: CreationOptional<string>
  declare resetTokenExpires: CreationOptional<Date>
  declare isVerified: boolean
  declare resetTokenExpiry: CreationOptional<Date>
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
}

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
    resetToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    resetTokenExpires: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    resetTokenExpiry: {
      type: DataTypes.DATE,
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
    tableName: TABLE_NAME,
    modelName: TABLE_NAME,
    timestamps: true,
  }
)

export default Users
