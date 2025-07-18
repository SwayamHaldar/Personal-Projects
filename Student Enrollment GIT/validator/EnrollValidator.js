import { body } from "express-validator";
import validate from "./errorvalidator.js";

export const validateEnroll = [
  body("ID")
    .trim()
    .notEmpty()
    .withMessage("Provide a valid ID.")
    .matches(/^\d+$/)
    .withMessage("ID must be a numeric value."),

  body("subjects")
    .isArray({ min: 1 })
    .withMessage("Subject must be a non-empty array.")
    .custom((subjects) => {
      if (subjects.length > 10) {
        throw new Error("Let's finish the 10 courses first.");
      }
      const allStrings = subjects.every(
        (sub) => typeof sub === "string" && sub.trim() !== "" && isNaN(sub)
      );
      if (!allStrings) {
        throw new Error("Subjects must be non-numeric, non-empty strings.");
      }
      return true;
    }),

  validate,
];
