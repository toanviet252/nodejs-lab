import { createError, errorHandler } from "../helpers/errorHandler";
import jwt from "jsonwebtoken";

export const isAuth = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) return createError("Unauthorized", 401);
  const token = authHeader.split(" ")[1];
  let decodeToken;
  try {
    decodeToken = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
  } catch (err) {
    next(errorHandler(err));
  }
  if (!decodeToken) return createError("Nota authenticated", 401);
  next();
};
