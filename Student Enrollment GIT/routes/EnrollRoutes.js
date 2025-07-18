import express from "express";
const road = express.Router();
import page from "../middleware/pagination.js";
import { validateEnroll } from "../validator/EnrollValidator.js";
import { EnrolledController } from "../controllers/enrolledController.js";

road.post("/add", validateEnroll, EnrolledController.slashadd);

road.post("/multiadd", validateEnroll, EnrolledController.AddSubjects);

road.delete("/delete", validateEnroll, EnrolledController.deleteSubject);

road.get("/details", page, EnrolledController.alldetails);

road.get("/detail/:param/:value", page, EnrolledController.exactItemdetail);

export default road;
