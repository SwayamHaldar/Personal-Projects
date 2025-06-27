import express from "express";
import Student from "../model/studentdetails.js";
import Enrolled from "../model/Enroll.js";
import UIDGeneration from "../functions";
const router = express.Router();

router.post("/add", async (req, res) => {
  const { name, mail, phone, subjects } = req.body;
  try {
    if (
      !name ||
      !mail ||
      !phone ||
      !Array.isArray(subjects) ||
      subjects.length === 0
    ) {
      return res.status(400).json({ error: "All fields are required." });
    }
    const existingStudent = await Student.findOne({ where: { Email: mail } });
    if (existingStudent) {
      return res.status(409).json({
        error: `Student with ID ${ID} already exists.`,
      });
    }

    const SubjectsTOAdd = subjects.map((sub) => sub);

    const student = await Student.create({
      ID: UIDGeneration(),
      Name: name,
      Email: mail,
      Phone: phone,
    });
    await Enrolled.bulkCreate(
      SubjectsTOAdd.map((sub) => ({
        StudentID: student.ID,
        Subject: sub,
      }))
    );

    return res.status(200).json({
      message: `${name} added successfully with ${SubjectsTOAdd.map(
        (sub) => sub
      )}`,
    });
  } catch (error) {
    console.error("Error creating student:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
});

router.post("/multiadd", async (req, res) => {
  try {
    const { register } = req.body;
    const added = [];
    for (const regi of register) {
      const { name, mail, phone } = regi;
      if (!name || !mail || !phone) {
        return res.status(400).json({ error: "All fields are required." });
      }
      const existingStudent = await Student.findOne({ where: { ID: ID } });
      if (existingStudent) {
        return res.status(409).json({
          error: `Student with ID ${ID} already exists.`,
        });
      }
      const student = await Student.create({
        ID: UIDGeneration(),
        Name: name,
        Email: mail,
        Phone: phone,
      });
      added.push(name);
    }

    return res.status(200).json({ message: `${added} added successfully.` });
  } catch (error) {
    console.error("Error creating student:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
});

router.delete("/delete", async (req, res) => {
  const { ID } = req.body;
  if (!Array.isArray(ID) || ID.length === 0) {
    return res.status(400).json({ error: "ID must be a non-empty array." });
  }

  try {
    for (const id of ID) {
      const exist = await Student.findOne({ where: { ID: ID } });
      if (exist) {
        await Student.destroy({ where: { ID: id } });
      } else
        return res
          .status(404)
          .json({ error: `Student with ID ${id} not found.` });
    }
  } catch (err) {
    console.log("Error deleting student: ", err);
    return res.status(500).json({ error: "Internal server error." });
  }
});

router.get("/details", async (req, res) => {
  const limit = 10;
  const page = parseInt(req.query.page) || 1;
  const offset = (page - 1) * limit;
  try {
    const students = await Student.findAll({
      include: [
        {
          model: Enrolled,
          attributes: ["Subject"],
        },
      ],
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

router.get("/detail/:param/:value", async (req, res) => {
  const { param, value } = req.params;
  const validParams = ["ID", "Name", "Email", "Phone"];
  if (!validParams.includes(param)) {
    return res.status(400).json({ error: `Invalid parameter: ${param}.` });
  }
  try {
    const student = await Student.findAll({
      include: [
        {
          model: Enrolled,
          attributes: ["Subject"],
        },
      ],
      where: { [param]: value },
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

export default router;
