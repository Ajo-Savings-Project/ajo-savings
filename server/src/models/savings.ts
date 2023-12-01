import { Model, DataTypes, BuildOptions, Sequelize } from "sequelize";
import { db } from "../config";
import Users from "./users";
import Wallets from "./wallets";

export enum frequency {
  DAILY = "Daily",
  WEEKLY = "Weekly",
  MONTHLY = "Monthly",
  ANNUALLY = "Annually"
}

enum category {
  TRAVEL = "Travel",
  DREAM_HOME = "Dream_Home",
  DREAM_CAR = "Dream_Car",
  RENT = "Rent",
  GADGETS = "Gadgets",
  OTHER = "Other"
}
export type SavingAttributes = {
  id: string;
  user_id: string;
  name: string;
  target: string;
  target_amount: number;
  amount_saved: number;
  frequency: string;
  category: string;
  startDate: string;
  endDate: string;
  created_at: Date;
};

class Savings extends Model<SavingAttributes> {
    target_amount: any;
    endDate: any;
}

Savings.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.UUID,
      references: {
        model: Users,
        key: "id",
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    target: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    frequency: {
      type: DataTypes.ENUM(...Object.values(frequency)),
      allowNull: false,
    },
    category: {
      type: DataTypes.ENUM(...Object.values(category)),
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    target_amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    amount_saved: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.DATE,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize: db,
    tableName: "Savings",
    modelName: "Savings",
  }
);


export default Savings