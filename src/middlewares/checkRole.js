import { createError, errorHandler } from "../helpers/errorHandler";
import userModel from "../models/user";

export const isAdmin = async (req, res, next) => {
  try {
    const user = req.user;
    const { id } = user;
    const userData = await userModel.findById(id);
    const { role } = userData;
    if (role !== "admin") return createError("Fobbiden", 403);
    next();
  } catch (err) {
    next(errorHandler(err));
  }
};
