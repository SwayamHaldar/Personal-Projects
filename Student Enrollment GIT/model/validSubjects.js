import sequel from "../config.js";
import { DataTypes } from "sequelize";

const SUBJECTS = sequel.define(
  "Subjects",
  {
    Subject: { type: DataTypes.STRING, allownull: false, primaryKey: true },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);
export default SUBJECTS;
