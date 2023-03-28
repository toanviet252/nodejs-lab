import { Router } from "express";
import { signin, signup } from "../controllers/auth";
import { body, check } from "express-validator";
import User from "../models/user";

const router = Router();

router.post("/sign-in", signin);
router.post(
  "/sign-up",
  [
    check("email")
      .normalizeEmail()
      .isEmail()
      .withMessage("Email is invalid")
      .custom(async (value, { req }) => {
        const user = await User.findOne({ email: value });
        if (user) {
          throw new Error("Email has already exists.");
        }
        return true;
      }),
    body("username")
      .trim()
      .isString()
      .isLength({
        min: 5,
      })
      .withMessage("Username must be more than 5 character"),
    body("fullName").trim().isString().isLength({
      min: 5,
    }),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Password must be at least 5 character"),
    body("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password)
        throw new Error("Password is not match.");
      return true;
    }),
  ],
  signup
);

export default router;
