import { createError } from "../helpers/errorHandler";
import jwt from "jsonwebtoken";
/* eslint-disable no-unused-vars */

export const isAuth = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) return createError("Unauthorized", 401);
  const token = authHeader.split(" ")[1];

  // verify token
  // Nếu không có lỗi err = null, decode = jwt object instance, nếu lỗi thì decode = undefined
  jwt.verify(token, process.env.JWT_PRIVATE_KEY, (err, decode) => {
    if (err) {
      if (err.name === "TokenExpiredError")
        return createError("Token has expired", 401);
      return createError(err.message, 401);
    } else {
      // console.log(decode);
      next();
    }
  });
};
