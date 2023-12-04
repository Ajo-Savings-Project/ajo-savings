import { Model, DataTypes } from "sequelize";
import { db } from "../config";
import Wallets from "./wallets";
import Users from "./users";

export enum action {
  DEBIT = "Debit",
  CREDIT = "Credit",
}

export enum transaction_status {
  SUCCESSFUL = "Successful",
  PENDING = "Pending",
  UNSUCCESSFUL = "Unsuccessful",
}

export enum transaction_type {
  GLOBAL = "Global",
  SAVINGS = "Savings",
  GROUP_WALLET = "Group Wallet",
}

export type TransactionAttributes = {
  id: string;
  wallet_id: string;
  owner_id: string;
  amount: number;
  status: string;
  action: string;
  type: string;
  receiver: string;
  created_at: Date;
};

class Transactions extends Model<TransactionAttributes> {
  static transaction: any;
}

Transactions.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    wallet_id: {
      type: DataTypes.UUID,
      references: {
        model: Wallets,
        key: "id",
      },
    },
    owner_id: {
      type: DataTypes.UUID,
      references: {
        model: Users,
        key: "id",
      },
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(...Object.values(transaction_status)),
      allowNull: false,
    },
    action: {
      type: DataTypes.ENUM(...Object.values(action)),
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM(...Object.values(transaction_type)),
      allowNull: false,
    },
    receiver: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize: db,
    tableName: "Transactions",
    modelName: "Transactions",
  }
);

Transactions.belongsTo(Wallets, {
  foreignKey: "wallet_id",
});

Transactions.belongsTo(Users, {
  foreignKey: "owner_id",
});

export default Transactions;
