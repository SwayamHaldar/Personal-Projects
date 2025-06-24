import express from "express";
import Student from "../model/studentdetails.js";
const road = express.Router();

road.get("/details", async (req, res) => {
  const limit = 10;
  const page = parseInt(req.query.page) || 1;
  const offset = (page - 1) * limit;
  try {
    const students = await Student.findAll({
      attributes: ["ID", "Name", "Email", "Phone", "Subject"],
      order: [["ID", "ASC"]],
      limit,
      offset,
    });
    if (students.length === 0) {
      return res.status(404).json({ message: "No student details found." });
    }
    return res.status(200).json(students);
  } catch (error) {
    console.error("Error fetching student details:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
});

road.get("/detail/:param/:value", async (req, res) => {
  const { param, value } = req.params;
  const validParams = ["ID", "Name", "Email", "Phone", "Subject"];
  if (!validParams.includes(param)) {
    return res.status(400).json({ error: `Invalid parameter: ${param}.` });
  }
  try {
    const student = await Student.findAll({
      where: { [param]: value },
      attributes: ["ID", "Name", "Email", "Phone", "Subject"],
      order: [["ID", "ASC"]],
    });
    if (student.length === 0) {
      return res
        .status(404)
        .json({ message: `No student found with ID ${ID}.` });
    }
    return res.status(200).json(student);
  } catch (error) {
    console.error(`Error fetching student details by ${param}:`, error);
    return res.status(500).json({ error: "Internal server error." });
  }
});
export default road;
