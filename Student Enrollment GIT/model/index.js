import Student from "./studentdetails.js";
import Enrolled from "./Enroll.js";

Student.hasMany(Enrolled, { foreignKey: "StudentID" });
Enrolled.belongsTo(Student, { foreignKey: "StudentID" });

export { Student, Enrolled };
