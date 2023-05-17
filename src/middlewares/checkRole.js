import { createError, errorHandler } from "../helpers/errorHandler";
import userModel from "../models/user";

export const isAdmin = async (req, res, next) => {
  // console.log(req.path);
  try {
    const user = req.user;
    const { id } = user;
    const userData = await userModel.findById(id);
    const { role } = userData;

    if (role === "admin") {
      next();
    } else if (role === "moderator") {
      if (req.path === "/chatrooms") {
        next();
      } else {
        return createError("Fobbiden", 403);
      }
    } else return createError("Fobbiden", 403);
  } catch (err) {
    next(errorHandler(err));
  }
};
