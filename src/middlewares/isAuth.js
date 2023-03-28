import jwt from "jsonwebtoken";
import { createError, errorHandler } from "../utils/errorHandler";

const isAuth = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) return createError("Unauthorzied!", 401);
  const token = authHeader.split(" ")[1];
  let decodeToken;
  try {
    decodeToken = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    // const { exp } = jwt.decode(token);
    // if (Date.now() >= exp * 100) return createError("Token expried", 401);
  } catch (err) {
    next(errorHandler(err));
  }
  if (!decodeToken) return createError("Not authenticated", 401);
  next();
};

export default isAuth;
