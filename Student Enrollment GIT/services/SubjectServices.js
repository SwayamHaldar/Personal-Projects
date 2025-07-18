import Student from "../model/studentdetails.js";
import SUBJECTS from "../model/validSubjects.js";
import Enrolled from "../model/Enroll.js";
import { Op } from "sequelize";

// console.log("\x1b[32m%s\x1b[0m", "Looping"); //error handling

export const SubjectService = {
  async add({ subj }) {
    const subject = await SUBJECTS.bulkCreate(
      subj.map((s) => ({ Subject: s }))
    );
    return subject;
  },
  async update({ subj }) {
    const changed = [];

    for (const item of subj) {
      const old = item.old;
      const newName = item.newName;
      if (!old || !newName) {
        changed.push({ old, status: "skipped" });
        continue;
      }
      const [affectedRows] = await SUBJECTS.update(
        { Subject: newName },
        { where: { Subject: old } }
      );

      if (affectedRows === 0) {
        changed.push({ old, status: "not found" });
      } else {
        changed.push({ old, status: `updated to ${newName}` });
      }
    }
    return { changed };
  },
  async delete({ subj }) {
    const subject = await SUBJECTS.destroy({
      where: { Subject: { [Op.in]: subj } },
    });
    return subject;
  },
  async details() {
    const subject = await SUBJECTS.findAll();
    const arranged = subject.map((s) => s.Subject);
    return arranged;
  },
};
