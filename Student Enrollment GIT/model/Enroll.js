import sequel from "../config.js";
import { DataTypes } from "sequelize";

const Enrolled = sequel.define(
  "Enrolls",
  {
    SqNo: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    StudentID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Students",
        key: "ID",
      },
    },
    Subject: { type: DataTypes.STRING, allowNull: false },
  },
  {
    freezeTableName: true,
    timestamps: false,
    id: false,
    indexes: [
      {
        unique: true,
        fields: ["StudentID", "Subject"],
      },
    ],
  }
);
export default Enrolled;
