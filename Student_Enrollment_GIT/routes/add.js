import express from "express";
import Student from "../model/studentdetails.js";
const router = express.Router();
import UpdateSubjects from "../services/processStudent.js";

router.post("/add", async (req, res) => {
  const { ID, name, mail, phone, subject } = req.body;
  if (!ID || !name || !mail || !phone || !subject) {
    return res.status(400).json({ error: "All fields are required." });
  }
  console.log("Creating student with values:", {
    ID,
    name,
    mail,
    phone,
    subject,
  });
  try {
    const student = await Student.create({
      ID: ID,
      Name: name,
      Email: mail,
      Phone: phone,
      Subject: subject,
    });

    return res.status(200).json({ message: `${subject} added successfully.` });
  } catch (error) {
    console.error("Error creating student:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
});

router.put("/Subjectadd", UpdateSubjects);

export default router;
