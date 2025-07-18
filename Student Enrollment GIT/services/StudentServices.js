import Student from "../model/studentdetails.js";
import SUBJECTS from "../model/validSubjects.js";
import Enrolled from "../model/Enroll.js";
import bcrypt from "bcrypt";
import fs from "fs";

//console.log("\x1b[32m%s\x1b[0m", "Looping"); error handling
export const StudentServices = {
  async studentcreate({ ID, name, mail, phone, password, DOB, gen }) {
    const existingStudent = await Student.findOne({ where: { Email: mail } });
    if (existingStudent) {
      return res.status(409).json({
        error: `Student with ID ${ID} already exists.`,
      });
    }
    const student = await Student.create({
      ID,
      Name: name,
      Email: mail,
      Phone: phone,
      Password: password,
      DOB: DOB,
      Gender: gen,
    });
    return student;
  },
  async delete({ ID }) {
    const students = await Student.findAll({ where: { ID } });
    const foundIDs = students.map((s) => s.ID);
    const deleted = students.map(({ ID, Name }) => ({ ID, Name }));

    const invalidID = ID.filter((id) => !foundIDs.includes(id));
    await Student.destroy({ where: { ID } });

    return { deleted, invalidID };
  },
  async alldetail({ limit, offset }) {
    const students = await Student.findAll({
      limit,
      offset,
      include: [
        {
          model: Enrolled,
          as: "Enrolled",
          attributes: ["Subject"], // You could also include subject IDs or full subject model
        },
      ],
    });

    if (students.length === 0) {
      return res.status(404).json({ message: "No student details found." });
    }
    const arrayStudents = students.map((student) => ({
      ID: student.ID,
      Name: student.Name,
      Email: student.Email,
      Phone: student.Phone,
      Subject: student.Enrolled.map((e) => e.Subject),
    }));
    return arrayStudents;
  },
  async exactdetail({ param, value }) {
    const student = await Student.findAll({
      include: [
        {
          model: Enrolled,
          as: "Enrolled",
          attributes: ["Subject"],
        },
      ],
      where: { [param]: value },
      order: [["ID", "ASC"]],
    });
    console.log("Working till here 1");
    const students = student.map((stud) => ({
      ID: stud.ID,
      Name: stud.Name,
      Email: stud.Email,
      Phone: stud.Phone,
      Subjects: stud.Enrolled.map((enroll) => enroll.Subject),
    }));
    console.log("Working till here 2");
    if (students.length === 0) {
      return res
        .status(404)
        .json({ message: `No student found with ID ${ID}.` });
    }
    return students;
  },
  async unassigned() {
    const allIds = (
      await Student.findAll({
        attributes: ["ID"],
      })
    ).map((s) => s.ID);
    const enrolledIDs = (
      await Enrolled.findAll({
        attributes: ["StudentID"],
      })
    ).map((s) => s.StudentID);
    const notenrolled = allIds.filter((s) => !enrolledIDs.includes(s));

    if (notenrolled.length === 0) {
      return "All students assigned to at least one subject.";
    }
    return notenrolled;
  },
  async register({ name, mail, phone, password, DOB, gen }) {
    const existingStudent = await Student.findOne({ where: { Email: mail } });

    if (existingStudent) {
      const error = new Error("Student already registered");
      error.status = 409;
      throw error;
    }

    const img = fs.readFileSync("images/profilePic.jpg", {
      encoding: "base64",
    });
    const hash = await bcrypt.hash(password, 10);

    const newStudent = await Student.create({
      Name: name,
      Email: mail,
      Phone: phone,
      Password: hash,
      DOB,
      Gender: gen,
      ProfilePic: img,
    });

    if (!newStudent) {
      const error = new Error("Registration failed");
      error.status = 500;
      throw error;
    }

    return newStudent;
  },
  async add({ name, mail, phone, subjects, password, DOB, gen }) {
    const existingStudent = await Student.findOne({ where: { Email: mail } });
    if (existingStudent) {
      return res.status(409).json({
        error: `Student with ID ${ID} already exists.`,
      });
    }

    const SubList = await SUBJECTS.findAll();

    const ValidSubjects = subjects.filter((s) =>
      SubList.map((sub) => sub.Subject).includes(s)
    );
    const existingsubjects = await Enrolled.findAll({
      where: { Subject: subjects },
    });
    const SubjectsTOAdd = ValidSubjects.filter(
      (s) => !existingsubjects.includes(s)
    );

    const student = await Student.create({
      Name: name,
      Email: mail,
      Phone: phone,
      Password: password,
      DOB: DOB,
      Gender: gen,
    });
    await Enrolled.bulkCreate(
      SubjectsTOAdd.map((sub) => ({
        StudentID: student.ID,
        Subject: sub,
      }))
    );
    return { student, SubjectsTOAdd };
  },
};
