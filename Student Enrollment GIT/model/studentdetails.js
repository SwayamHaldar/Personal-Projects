import sequel from "../config.js";
import { DataTypes } from "sequelize";

const Student = sequel.define(
  "Students",
  {
    ID: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false },
    Name: { type: DataTypes.STRING, allowNull: false },
    Email: { type: DataTypes.STRING, allowNull: false },
    Phone: { type: DataTypes.STRING, allowNull: false },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

export default Student;
