import express from "express";
import Student from "../model/studentdetails.js";
const path = express.Router();

path.delete("/delete", async (req, res) => {
  const { ID, subject } = req.body;
  try {
    const students = await Student.destroy({
      where: { ID: ID, Subject: subject },
    });
    if (students.length === 0) {
      return res.status(404).json({ message: "Student details not found." });
    }
    res.status(200).json({
      message: `Subject ${subject} removed successfully for student with ID ${ID}.`,
    });
  } catch (error) {
    console.error("Student details dont exist:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
});

export default path;
