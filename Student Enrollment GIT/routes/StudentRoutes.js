import express from "express";
import bcrypt from "bcrypt";
import Student from "../model/studentdetails.js";
import Enrolled from "../model/Enroll.js";
import SUBJECTS from "../model/validSubjects.js";
import UIDGeneration from "../functions";
import { StudentController } from "../controllers/studentController.js";
import { StudentValidator } from "../validator/StudentValidator.js";
import page from "../middleware/pagination.js";
import { IDValidator } from "../validator/IDValidator.js";
import { RegisterValidator } from "../validator/RegisterValidator.js";
import fs from "fs";
const router = express.Router();

router.post("/add", StudentValidator, StudentController.add);

router.post(
  "/multiadd",
  RegisterValidator,
  StudentValidator,
  StudentController.multiadd
);

router.delete("/delete", IDValidator, StudentController.delete);

router.get("/details", page, StudentController.alldetails);

router.get("/detail/:param/:value", page, StudentController.exactdetails);

router.get("/unasigned", page, StudentController.unassigned);

router.post("/auth", StudentValidator, StudentController.authenticateregister);

export default router;
