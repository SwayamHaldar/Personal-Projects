import express from "express";
import { validateLoginInfo } from "../validator/logininfovalidate.js";
import OTPGeneration from "../middleware/otp.js";
import { LoginController } from "../controllers/otp.js";
const segway = express.Router();

segway.post(
  "/attempt",
  validateLoginInfo,
  OTPGeneration,
  LoginController.handelLogic
);

export default segway;
