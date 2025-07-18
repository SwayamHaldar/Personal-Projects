import Student from "./studentdetails.js";
import Enrolled from "./Enroll.js";
import SUBJECTS from "./validSubjects.js";

SUBJECTS.hasMany(Enrolled, { foreignKey: "Subject", as: "Enrolled" });
Enrolled.hasMany(SUBJECTS, { foreighKey: "Subject", as: "Subjects" });

Student.hasMany(Enrolled, { foreignKey: "StudentID", as: "Enrolled" });
Enrolled.belongsTo(Student, { foreignKey: "StudentID", as: "Student" });

export { Student, Enrolled, SUBJECTS };
