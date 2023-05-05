import validatorRequest from "../helpers/vaidateRequest";
import User from "../models/user.js";
import { createError, errorHandler } from "../helpers/errorHandler";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const whoAmI = async (req, res, next) => {
  try {
    const user = req.user;
    const { id } = user;
    const data = await User.findById(id).select("-password");
    if (!data) return createError("Not found user", 404);
    return res.status(200).json({
      data,
    });
  } catch (err) {
    next(errorHandler(err));
  }
};

export const signin = async (req, res, next) => {
  try {
    validatorRequest(req);
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({
      email: email,
    });
    if (!user) return createError("Email is incorrect", 400);
    const matchPass = await bcrypt.compare(password, user.password);
    if (!matchPass) return createError("Password is incorrect", 400);
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
    // session for each user
    req.session.isLoggedIn = true;
    req.session.user = user;
    await req.session.save();

    return res.status(200).json({
      token,
      message: "Logged Success",
      user: {
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        _id: user._id,
      },
    });
  } catch (err) {
    next(errorHandler(err));
  }
};

export const signup = async (req, res, next) => {
  const password = req.body.password;
  const signUpData = req.body;

  try {
    validatorRequest(req);
    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      ...signUpData,
      password: hashPassword,
      orders: [],
      cart: [],
      role: signUpData.role ?? "user",
    });
    await newUser.save();
    return res.status(201).json({
      message: "User is created!",
    });
  } catch (err) {
    next(errorHandler(err));
  }
};

export const signout = async (req, res, next) => {
  try {
    await req.session.destroy();
    return res.status(200).json(true);
  } catch (err) {
    next(errorHandler(err));
  }
};
