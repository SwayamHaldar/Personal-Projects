import Student from "../model/studentdetails.js";
import Enrolled from "../model/Enroll.js";

export default async function AddSubjects(req, res) {
  const { ID, subjects } = req.body;

  if (!ID || !subjects || !Array.isArray(subjects) || subjects.length === 0) {
    return res.status(400).json({ error: "ID and subjects are required." });
  }

  try {
    const existingStudent = await Student.findOne({ where: { ID: ID } });

    if (!existingStudent) {
      return res.status(404).json({ error: "Student not registered." });
    }

    const existingSubjects = await Enroll.findAll({
      where: { StudentID: ID },
      attributes: ["Subject"],
    });

    const assignedSubjects = existingSubjects.map((s) => s.Subject);

    const SubjectsTOAdd = subjects.filter(
      (sub) => !assignedSubjects.includes(sub)
    );

    await Enrolled.bulkCreate(
      SubjectsTOAdd.map((sub) => ({
        StudentID: existingStudent.ID,
        Subject: sub,
      }))
    );
    return res.status(200).json({
      message: `${SubjectsTOAdd.length} subject(s) added for student ${ID}.`,
      subjectsAdded: SubjectsTOAdd,
    });
  } catch (err) {
    console.error("Error updating subjects:", err.message);
    return res.status(500).json({ error: "Internal server error." });
  }
}
