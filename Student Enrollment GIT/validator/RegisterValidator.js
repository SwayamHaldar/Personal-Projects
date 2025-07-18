import { body, validationResult } from "express-validator";
import validate from "./errorvalidator.js";

export const RegisterValidator = [
  body("Register").isArray({ min: 1 }).withMessage("Register must benon-empty"),

  body("register.*.name")
    .trim()
    .notEmpty()
    .withMessage("Name is required.")
    .matches(/^[a-zA-Z][a-zA-Z\s.'-]{1,49}$/)
    .withMessage("Name contains Invalid characters."),
  body("register.*.mail")
    .trim()
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Email format is invalid."),
  body("register.*.phone")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required.")
    .matches(/^\d{10}$/)
    .withMessage("Phone number must be exactly 10 digits."),

  validate,
];
