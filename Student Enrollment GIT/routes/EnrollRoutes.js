import express from "express";
import Enrolled from "../model/Enroll.js";
import Student from "../model/studentdetails.js";
const road = express.Router();
import AddSubjects from "../services/processStudent.js";

road.post("/add", async (req, res) => {
  const { ID, subjects } = req.body;

  if (!ID || !subjects) {
    return res.status(400).json({ error: "ID and subjects are required." });
  }

  try {
    const existingStudent = await Student.findOne({ where: { ID: ID } });

    if (!existingStudent) {
      return res.status(404).json({ error: "Student not registered." });
    }

    await Enrolled.create({
      StudentID: ID,
      Subject: subjects,
    });

    return res.status(200).json({ message: "Subject added successfully." });
  } catch (err) {
    console.error("Can't add subject:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
});

road.post("/multiadd", AddSubjects);

road.delete("/delete", async (req, res) => {
  const { ID, subject } = req.body;
  try {
    const enroll = await Enrolled.destroy({
      where: { ID: ID, Subject: subject },
    });
    if (enroll.length === 0) {
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

road.get("/details", async (req, res) => {
  const { page = 1 } = req.query || {};
  const limit = 10;
  const offset = (page - 1) * limit;

  try {
    const enrollments = await Enrolled.findAll({
      limit,
      offset,
      order: [["StudentID", "ASC"]],
    });
    if (enrollments.length === 0) {
      return res.status(404).json({ message: "No enrollments found." });
    }
    return res.status(200).json(enrollments);
  } catch (err) {
    console.error("Error fetching enrollments:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
});

road.get("/detail/:param/:value", async (req, res) => {
  const { param, value } = req.params;
  if (param != "ID" && param != "Subject") {
    return res.status(400).json({ error: `Invalid parameter: ${param}.` });
  }
  try {
    const enrollments = await Enrolled.findAll({
      where: { [param]: value },
      attributes: ["StudentID", "Subject"],
    });
    if (enrollments.length === 0) {
      return res.status(404).json({ message: "No enrollments found." });
    }
    return res.status(200).json(enrollments);
  } catch (error) {
    console.error("Error fetching enrollments:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
});
export default road;
