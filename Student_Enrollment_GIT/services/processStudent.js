import Student from "../model/studentdetails.js";

export default async function UpdateSubjects(req, res) {
  const { ID, subject } = req.body;

  if (!ID || !subject) {
    return res
      .status(400)
      .json({ error: "ID and a non-empty subject are required." });
  }

  try {
    const existingStudent = await Student.findOne({ where: { ID: ID } });

    if (!existingStudent) {
      return res.status(404).json({ error: "Student not found." });
    }

    const NewSubs = [];

    for (const sub of subject) {
      const alreadyExists = await Student.findOne({
        where: { ID: ID, Subject: sub },
      });

      if (!alreadyExists) {
        const updatedSubject = await Student.create({
          ID: existingStudent.ID,
          Name: existingStudent.Name,
          Email: existingStudent.Email,
          Phone: existingStudent.Phone,
          Subject: sub,
        });

        NewSubs.push(updatedSubject);
      }
    }

    if (NewSubs.length === 0) {
      return res.status(409).json({
        message: "Student already enrolled in all specified subjects.",
      });
    }

    return res.status(200).json({
      message: `${NewSubs.length} new subject(s) added for student ${ID}.`,
      subjectsAdded: NewSubs.map((r) => r.Subject),
    });
  } catch (err) {
    console.error("Error updating subjects:", err.message);
    return res.status(500).json({ error: "Internal server error." });
  }
}
