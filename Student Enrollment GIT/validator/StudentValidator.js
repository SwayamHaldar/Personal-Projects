import { body, validationResult } from "express-validator";
import validate from "./errorvalidator.js";

export const StudentValidator = [
  body("name")
    .trim()
    .notEmpty()
    .matches(/^[a-zA-Z][a-zA-Z\s.'-]{1,49}$/)
    .withMessage("Invalid name format."),
  body("mail")
    .trim()
    .notEmpty()
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    .withMessage("Invalid email format."),
  body("phone")
    .trim()
    .notEmpty()
    .matches(/^\d{10}$/)
    .withMessage("Phone number must be 10 digits."),
  body("password")
    .trim()
    .notEmpty()
    .custom((val) => {
      if (/[A-Z]/ != val) return "Must contain at least a Capital leter";
      if (/[a-z]/ != val) return "Must contain at least a lowercase leter";
      if (/[0-9]/ != val) return "Must contain at least a  number";
      if (/[\W_]/ != val) return "Must contain at least a Special char";
      if (val.length != 8) return "Passord should be at least 8 letters long";
    }),
  body("DOB")
    .trim()
    .notEmpty()
    .withMessage("Date of Birth is required.")
    .isISO8601()
    .withMessage("Invalid date format (use YYYY-MM-DD)."),
  body("gen")
    .trim()
    .notEmpty()
    .withMessage("Gender is required.")
    .isIn(["male", "female"])
    .withMessage("Gender must be 'male' or 'female'."),

  validate,
];
