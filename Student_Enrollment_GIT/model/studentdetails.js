import sequel from "../config.js";
import { DataTypes } from "sequelize";

const Student = sequel.define(
  "StudentDetails",
  {
    SqNo: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    ID: { type: DataTypes.INTEGER, allowNull: false },
    Name: { type: DataTypes.STRING, allowNull: false },
    Email: { type: DataTypes.STRING, allowNull: false },
    Phone: { type: DataTypes.STRING, allowNull: false },
    Subject: { type: DataTypes.STRING, allowNull: false },
  },
  {
    freezeTableName: true,
    timestamps: false,
    id: false,
    indexes: [
      {
        unique: true,
        fields: ["ID", "Subject"],
      },
    ],
  }
);

export default Student;
