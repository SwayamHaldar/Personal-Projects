import express from "express";
import { SubjectValidate } from "../validator/SubjectValidator.js";
import { SubjectController } from "../controllers/subjectController.js";
import { SubjectUpdateValidate } from "../validator/SubjectUpdateValidator.js";
const path = express.Router();

path.post("/add", SubjectValidate, SubjectController.add);

path.put("/update", SubjectUpdateValidate, SubjectController.update);

path.delete("/delete", SubjectValidate, SubjectController.delete);
path.get("/details", SubjectController.details);

export default path;
