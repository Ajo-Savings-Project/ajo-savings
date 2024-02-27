import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize'
import { db } from '../config'

export const role = {
  ADMIN: 'Admin',
  CONTRIBUTOR: 'Contributor', //NORMAL USER
} as const
export type RoleType = (typeof role)[keyof typeof role]

export const authMethod = {
  BASIC: 'Basic',
  OAUTH: 'OAuth',
} as const
export type AuthMethodType = (typeof authMethod)[keyof typeof authMethod]

export const identificationTypes = {
  NIN: 'NIN',
  INTERNATIONAL_PASSPORT: 'International Passport',
  DRIVERS_LICENCE: 'Drivers Licence',
  VOTERS_CARD: 'Voters Card',
} as const
export type IdentificationType =
  (typeof identificationTypes)[keyof typeof identificationTypes]

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
  declare profilePic: CreationOptional<string>
  declare password: string
  declare role: RoleType
  declare phone: string
  declare gender: CreationOptional<string>
  declare occupation: CreationOptional<string>
  declare dateOfBirth: CreationOptional<Date>
  declare bvn: CreationOptional<string>
  declare address: CreationOptional<string>
  declare identificationType: CreationOptional<IdentificationType>
  declare identificationNumber: CreationOptional<string>
  declare identificationDoc: CreationOptional<string>
  declare proofOfAddressDoc: CreationOptional<string>
  declare emailIsVerified: CreationOptional<boolean>
  declare kycComplete: CreationOptional<boolean>
  declare authMethod: CreationOptional<AuthMethodType>
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
    authMethod: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    emailIsVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    kycComplete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    role: {
      type: DataTypes.ENUM(...Object.values(role)),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
    },
    gender: {
      type: DataTypes.STRING,
    },
    occupation: {
      type: DataTypes.STRING,
    },
    dateOfBirth: {
      type: DataTypes.DATE,
    },
    bvn: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
    identificationType: {
      type: DataTypes.STRING,
    },
    identificationNumber: {
      type: DataTypes.STRING,
    },
    identificationDoc: {
      type: DataTypes.STRING,
    },
    proofOfAddressDoc: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: db,
    modelName: TABLE_NAME,
    timestamps: true,
  }
)

export default Users
