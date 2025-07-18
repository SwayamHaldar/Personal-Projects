import { body, validationResult } from "express-validator";
import validate from "./errorvalidator.js";

export const IDValidator = [
  body("ID")
    .trim()
    .notEmpty()
    .custom((value) => {
      if (typeof value === "string" || typeof value === "number") {
        if (!/^\d+$/.test(value)) {
          throw new Error("ID must be a numeric string or integer.");
        }
        return true;
      }

      if (Array.isArray(value)) {
        const allNumeric = value.every((v) => /^\d+$/.test(String(v)));
        if (!allNumeric) {
          throw new Error("All IDs in the array must be numeric.");
        }
        return true;
      }

      throw new Error("ID must be a number or an array of numbers.");
    }),
  validate,
];
