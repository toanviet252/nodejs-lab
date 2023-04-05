import validatorRequest from "../utils/validator.js";
import User from "../models/user.js";
import { createError, errorHandler } from "../utils/errorhandler.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signin = async (req, res, next) => {
  validatorRequest(req);
  const email = req.body.email;
  // console.log(email);
  const password = req.body.password;
  try {
    const user = await User.findOne({
      email: email,
    });
    if (!user) return createError("Email is incorrect", 401);
    const matchPass = await bcrypt.compare(password, user.password);
    if (!matchPass) return createError("Password is incorrect", 401);
    const token = jwt.sign(
      {
        email: user.email,
        id: user._id.toString(),
        fullName: user.fullName,
        isAdmin: user.isAdmin,
        phoneNumber: user.phoneNumber,
      },
      process.env.JWT_PRIVATE_KEY,
      {
        expiresIn: "1d",
      }
    );
    return res.status(200).json({
      token,
      message: "Logged Success",
      user: {
        email: user.email,
        fullName: user.fullName,
        isAdmin: user.isAdmin,
        phoneNumber: user.phoneNumber,
      },
    });
  } catch (err) {
    next(errorHandler(err));
  }
};

export const signup = async (req, res, next) => {
  const password = req.body.password;

  try {
    validatorRequest(req);

    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashPassword,
      fullName: req.body.fullName,
      phoneNumber: req.body.phoneNumber,
    });
    await newUser.save();
    return res.status(201).json({
      message: "User is created!",
    });
  } catch (err) {
    next(errorHandler(err));
  }
};
