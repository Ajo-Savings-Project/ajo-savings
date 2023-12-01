import { Model, DataTypes } from "sequelize";
import Transactions from "./transactions";
import { db } from "../config";

export enum role {
  ADMIN = "Admin",
  CONTRIBUTOR = "Contributor" //NORMAL USER
}

// export enum identificationType {
//   NIN = "NIN",
//   PASSPORT = "Passport",
//   DRIVERS_LICENSE = "Drivers License",
//   NEPA_BILL = "NEPA Bill"
// }

export type UserAttributes = {
  [x: string]: any;
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePic: string;
  password: string;
  role: string;
  phone: string;
  created_at: Date;
  gender: string
  occupation: string
  date_of_birth: Date
  bvn: string
  address: string
  identification_number: string
  identification_doc: string
  proof_of_address_doc: string
  otp: string | null
  // identification_type?: identificationType
};

class Users extends Model<UserAttributes>{
    wallet_amount: any;
    created_at!: Date;
    static firstName: any;
  otp!: string;
  static otp: any;
    
}


Users.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    profilePic: {
      type: DataTypes.STRING,
      allowNull: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true
    },
    otp:{
      type: DataTypes.STRING,
      allowNull: true
    },
    role: {
      type: DataTypes.ENUM(...Object.values(role)),
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false
    },
    occupation: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date_of_birth: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.DATE
    },
    bvn: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    identification_number: {
      type: DataTypes.STRING,
      allowNull: false
    },
    identification_doc: {
      type: DataTypes.STRING,
      allowNull: false
    },
    proof_of_address_doc: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // identification_type: {
    //   type: DataTypes.ENUM(...Object.values(identificationType)),
    //   allowNull: true
    // },
  }, {
  sequelize: db,
  tableName: "Users",
  modelName: "Users"
}
)

export default Users