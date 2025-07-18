import { body, validationResult } from "express-validator";
import validate from "./errorvalidator.js";

export const SubjectValidate = [
  body("subj").custom((sub) => {
    if (!Array.isArray(sub) || sub.length === 0) {
      throw new Error("Entry is not an array.");
    }
    const regex = /^[a-zA-Z][a-zA-Z0-9\s\-:,'"!]{1,49}$/;
    const valid = sub.every((s) => typeof s === "string" && regex.test(s));
    if (!valid) throw new Error("EVery subject must be valid.");

    return true;
  }),
  validate,
];
