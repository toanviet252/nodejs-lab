import express from "express";
import { signin, signout, signup, whoAmI } from "../controllers/auth";
import { body } from "express-validator";
import userModel from "../models/user";
import { isAuth } from "../middlewares/isAuth";

const router = express.Router();

router.get("/me", isAuth, whoAmI);

router.post(
  "/signin",
  [body("email").notEmpty().isEmail(), body("password").notEmpty().isString()],
  signin
);
router.post(
  "/signup",
  [
    body("email")
      .normalizeEmail()
      .trim()
      .isEmail()
      .custom(async (value) => {
        const exist = await userModel.findOne({ email: value });
        if (exist) {
          throw new Error("Email is already used!");
        }
        return true;
      }),
    body(["fullName", "password", "phoneNumber"]).notEmpty().trim().isString(),
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

router.post("/signout", signout);

export default router;
