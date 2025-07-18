import { body, validationResult } from "express-validator";
import validate from "./errorvalidator.js";

export const SubjectUpdateValidate = [
  body("subj").custom((sub) => {
    if (!Array.isArray(sub) || sub.length === 0) {
      throw new Error("Entry must be a non-empty array.");
    }

    const regex = /^[a-zA-Z][a-zA-Z0-9\s\-:,'"!]{1,49}$/;

    const valid = sub.every((item) => {
      return (
        typeof item === "object" &&
        typeof item.old === "string" &&
        typeof item.newName === "string" &&
        regex.test(item.old) &&
        regex.test(item.newName)
      );
    });

    if (!valid)
      throw new Error("Each item must have valid 'old' and 'new' strings.");

    return true;
  }),
  validate,
];
