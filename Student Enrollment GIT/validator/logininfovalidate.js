import { body } from "express-validator";
import validate from "./errorvalidator.js";

export const validateLoginInfo = [
  body("name")
    .trim()
    .isLength({ min: 2, max: 50 })
    .matches(/^[a-zA-Z][a-zA-Z\s.'-]{1,49}$/)
    .withMessage("Name cannot have Special characters"),
  body("value")
    .trim()
    .notEmpty()
    .custom((value) => {
      const phone = /^\d{10}$/.test(value);
      const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      if (!phone && !email) {
        throw new Error("Must be a valid phone number or email");
      }
      return true;
    }),
  validate,
];
