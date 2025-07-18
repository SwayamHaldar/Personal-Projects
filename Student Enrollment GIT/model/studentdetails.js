import sequel from "../config.js";
import { DataTypes, Sequelize } from "sequelize";

const Student = sequel.define(
  "Students",
  {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    Name: { type: DataTypes.STRING, allowNull: false },
    Email: { type: DataTypes.STRING, allowNull: false, unique: true },
    Phone: { type: DataTypes.STRING, allowNull: false, unique: true },
    Password: { type: DataTypes.STRING, allowNull: false, defaultValue: "N/A" },
    DOB: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: Sequelize.NOW,
    },
    Gender: { type: DataTypes.ENUM("Male", "Female") },
    ProfilePic: {
      type: DataTypes.STRING,
      defaultValue: "/images/standard.jpg",
    },
    Auto_fill: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

export default Student;
