import { EnrolledServices } from "../services/EnrollServices.js";

//console.log("\x1b[32m%s\x1b[0m", "Working 4");

export const EnrolledController = {
  async slashadd(req, res) {
    const { ID, subjects } = req.body;

    try {
      const result = await EnrolledServices.add({ ID, subjects });
      return res
        .status(200)
        .json({ message: "Subject added successfully.", subject: result });
    } catch (err) {
      console.error("Can't add subject:", err);
      return res.status(500).json({ error: "Internal server error." });
    }
  },
  async AddSubjects(req, res) {
    const { ID, subjects } = req.body;

    try {
      const result = await EnrolledServices.addSubjects({ ID, subjects });
      const skipped = result.assignedSubjects;
      return res.status(200).json({
        message: `${result.SubjectsTOAdd.length} subject(s) added for student ${ID}.`,
        subjectsAdded: result.SubjectsTOAdd,
        skipped: skipped.filter((sub) => result.valid.includes(sub)),
        invalidSubjects: result.invalid,
      });
    } catch (err) {
      console.error("Error updating subjects:", err.message);
      return res.status(500).json({ error: "Internal server error." });
    }
  },
  async deleteSubject(req, res) {
    const { ID, subjects } = req.body;
    try {
      const result = await EnrolledServices.delete({ ID, subjects });
      res.status(200).json({
        message: `Subject ${subjects} removed successfully for student with ID ${ID}.`,
      });
    } catch (error) {
      console.error("Student details dont exist:", error);
      return res.status(500).json({ error: "Internal server error." });
    }
  },
  async alldetails(req, res) {
    const { limit, offset } = req.pagination;
    try {
      const result = await EnrolledServices.alldetails({ limit, offset });

      return res.status(200).json(result);
    } catch (err) {
      console.error("Error fetching enrollments:", err);
      return res.status(500).json({ error: "Internal server error." });
    }
  },
  async exactItemdetail(req, res) {
    const { param, value } = req.params;
    if (param != "StudentID" && param != "Subject") {
      return res.status(400).json({ error: `Invalid parameter: ${param}.` });
    }
    const { limit, offset } = req.pagination;
    try {
      const result = await EnrolledServices.exactdetails({
        limit,
        offset,
        param,
        value,
      });
      return res.status(200).json(result);
    } catch (err) {
      console.error("Error fetching enrollments:", err);
      return res.status(500).json({ error: "Internal server error." });
    }
  },
};
