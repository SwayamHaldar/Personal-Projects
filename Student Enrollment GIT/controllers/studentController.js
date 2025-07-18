import { StudentServices } from "../services/StudentServices.js";

// console.log("\x1b[32m%s\x1b[0m", "Looping"); //error handling

export const StudentController = {
  async authenticateregister(req, res) {
    const { name, mail, phone, password, DOB, gen } = req.body;
    try {
      const result = await StudentServices.register({
        name,
        mail,
        phone,
        password,
        DOB,
        gen,
      });
      return res.status(200).json(`Successfully Registered ${result}`);
    } catch (err) {
      console.log("error logging in ", err);
      return res.status(500).send("Internal server error");
    }
  },
  async unassigned(req, res) {
    try {
      const result = await StudentServices.unassigned();
      return res
        .status(200)
        .json({ message: "The unenrolled students are: ", student: result });
    } catch (err) {
      console.log(err);
      return res.status(500).json("Internal server error");
    }
  },
  async exactdetails(req, res) {
    const { param, value } = req.params;
    const validParams = ["ID", "Name", "Email", "Phone"];
    if (!validParams.includes(param)) {
      return res.status(400).json({ error: `Invalid parameter: ${param}.` });
    }
    try {
      const result = await StudentServices.exactdetail({ param, value });
      console.log("Working till here 3");
      return res.status(200).json(result);
    } catch (error) {
      console.error(`Error fetching student details by ${param}:`, error);
      return res.status(500).json({ error: "Internal server error." });
    }
  },
  async alldetails(req, res) {
    const { limit, offset } = req.pagination;
    try {
      const result = await StudentServices.alldetail({ limit, offset });

      return res.status(200).json(result);
    } catch (error) {
      console.error("Error fetching student details:", error);
      return res.status(500).json({ error: "Internal server error." });
    }
  },
  async delete(req, res) {
    const { ID } = req.body;
    try {
      const result = await StudentServices.delete({ ID });
      return res.status(200).json({
        message: "Deletion attempt completed.",
        deletedStudents: result.deleted,
        invalidIDs: result.invalidID,
      });
    } catch (err) {
      console.error("Error deleting student: ", err);
      return res.status(500).json({ error: "Internal server error." });
    }
  },
  async multiadd(req, res) {
    const { register } = req.body;
    const added = [];
    try {
      for (const entry of register) {
        const { ID, name, mail, phone, password, DOB, gen } = entry;
        const student = await StudentServices.studentcreate({
          ID,
          name,
          mail,
          phone,
          password,
          DOB,
          gen,
        });
        added.push(name);
      }

      return res.status(200).json({ message: `${added} added successfully.` });
    } catch (error) {
      console.error("Error creating student:", error);
      return res.status(500).json({ error: "Internal server error." });
    }
  },
  async add(req, res) {
    const { name, mail, phone, subjects, password, DOB, gen } = req.body;
    try {
      const result = await StudentServices.add({
        name,
        mail,
        phone,
        subjects,
        password,
        DOB,
        gen,
      });
      const student = result.student.get({ plain: true });
      const Name = student.Name;
      return res.status(200).json({
        message: `${Name} added successfully with ${result.SubjectsTOAdd.map(
          (sub) => sub + " "
        )}`,
        warning:
          "An auto-generated profile has been created. You can update you full profile later in the settings.",
        studentID: result.student.ID,
      });
    } catch (error) {
      console.error("Error creating student:", error);
      return res.status(500).json({ error: "Internal server error." });
    }
  },
};
