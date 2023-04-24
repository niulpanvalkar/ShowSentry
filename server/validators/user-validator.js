import express from "express";
import { body, validationResult } from "express-validator";

export const validateUserSignup = [
  body("email").isEmail().withMessage("Please enter a valid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password should consist of minimum 6 characters"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const validateUserSignin = [
  body("username").exists().withMessage("username is required"),
  body("password")
    .exists()
    .withMessage("Password is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];



// export default validateCreateUser;
