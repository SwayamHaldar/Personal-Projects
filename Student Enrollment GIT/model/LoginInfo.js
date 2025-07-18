import sequel from "../config.js";
import { DataTypes } from "sequelize";

const LOGIN = sequel.define(
  "LoginDetails",
  {
    Name: { type: DataTypes.STRING, allowNull: false },
    Value: { type: DataTypes.STRING, allowNull: false },
    OTP: { type: DataTypes.INTEGER, defaultValue: 0o0 },
    Verefied: { type: DataTypes.BOOLEAN, defaultValue: false },
    ExpiresAt: { type: DataTypes.DATE, allowNull: false },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);
export default LOGIN;
