import Enrolled from "../model/Enroll.js";
import SUBJECTS from "../model/validSubjects.js";
import Student from "../model/studentdetails.js";

//console.log("\x1b[32m%s\x1b[0m", "Working 4"); error handling

export const EnrolledServices = {
  async add({ ID, subjects }) {
    const SubList = await SUBJECTS.findAll();
    const existingsubject = SubList.map((s) => s.Subject);
    const valid = subjects.filter((s) => existingsubject.includes(s));
    const invalid = subjects.filter((s) => !existingsubject.includes(s));
    const existingStudent = await Student.findOne({ where: { ID: ID } });

    if (!existingStudent) {
      throw new Error("Student not registered.");
    }

    const create = await Enrolled.bulkCreate(
      valid.map((sub) => ({
        StudentID: ID,
        Subject: sub,
      }))
    );

    return create;
  },
  async addSubjects({ ID, subjects }) {
    const SubList = await SUBJECTS.findAll();
    const validSubjects = SubList.map((s) => s.Subject);
    const valid = subjects.filter((s) => validSubjects.includes(s));
    const invalid = subjects.filter((s) => !validSubjects.includes(s));

    const existingStudent = await Student.findOne({ where: { ID: ID } });
    if (!existingStudent) {
      throw new Error("Student not registered.");
    }

    const existingSubjects = await Enrolled.findAll({
      where: { StudentID: ID },
      attributes: ["Subject"],
    });
    const assignedSubjects = existingSubjects.map((s) => s.Subject);

    const SubjectsTOAdd = valid.filter(
      (sub) => !assignedSubjects.includes(sub)
    );

    await Enrolled.bulkCreate(
      SubjectsTOAdd.map((sub) => ({
        StudentID: existingStudent.ID,
        Subject: sub,
      }))
    );
    return { SubjectsTOAdd, assignedSubjects, valid, invalid };
  },
  async delete({ ID, subjects }) {
    const existingStudent = await Student.findOne({ where: { ID: ID } });
    if (existingStudent) {
      const enroll = await Enrolled.destroy({
        where: { StudentID: ID, Subject: subjects },
      });
      if (enroll.length === 0) {
        throw new Error("Student not registered.");
      } else return existingStudent;
    }
  },
  async alldetails({ limit, offset }) {
    const enrollments = await Enrolled.findAll({
      limit,
      offset,
      order: [["StudentID", "ASC"]],
      raw: true,
    });
    if (enrollments.length === 0) {
      throw new Error("Student not registered.");
    }

    const group = {};
    for (const rec of enrollments) {
      const { StudentID, ...Details } = rec;

      if (!group[StudentID]) group[StudentID] = [];
      group[StudentID].push(Details);
    }
    const arranged = Object.entries(group).map(([StudentID, Details]) => ({
      StudentID: Number(StudentID),
      Details,
    }));

    return arranged;
  },
  async exactdetails({ limit, offset, param, value }) {
    const enrollments = await Enrolled.findAll({
      limit,
      offset,
      where: { [param]: value },
      attributes: ["StudentID", "Subject"],
      order: [["StudentID", "ASC"]],
      raw: true,
    });
    if (enrollments.length === 0) {
      throw new Error("Student not registered.");
    }
    if (param === "StudentID") {
      const obj = {
        StudentID: [...new Set(enrollments.map((s) => s.StudentID))][0],
        Subjects: enrollments.map((s) => s.Subject),
      };

      return obj;
    } else {
      const obj = {
        Subject: [...new Set(enrollments.map((s) => s.Subject))][0],
        StudentID: enrollments.map((s) => s.StudentID),
      };
      return obj;
    }
  },
};
