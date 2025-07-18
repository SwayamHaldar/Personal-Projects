import { SubjectService } from "../services/SubjectServices.js";

// console.log("\x1b[32m%s\x1b[0m", "Looping"); //error handling

export const SubjectController = {
  async add(req, res) {
    const { subj } = req.body;
    try {
      const result = await SubjectService.add({ subj });
      return res.status(200).json(result);
    } catch (err) {
      console.log("you fucked up.");
      return res.status(500).json({ error: err.message });
    }
  },
  async update(req, res) {
    const { subj } = req.body;
    try {
      const result = await SubjectService.update({ subj });
      return res
        .status(200)
        .json({ message: "Update Successfull", Result: result });
    } catch (err) {
      console.log("you fucked up.");
      return res.status(500).json({ error: err.message });
    }
  },
  async delete(req, res) {
    const { subj } = req.body;

    try {
      const result = await SubjectService.delete({ subj });
      return res
        .status(200)
        .json({ message: "Subject Deleted.", Result: result });
    } catch (err) {
      console.log("you fucked up.");
      return res.status(500).json({ error: err.message });
    }
  },
  async details(req, res) {
    try {
      const result = await SubjectService.details();
      return res
        .status(200)
        .json({ Message: "Valid Subjects", Subjects: result });
    } catch (err) {
      console.log("you fucked up.");
      return res.status(500).json({ error: err.message });
    }
  },
};
