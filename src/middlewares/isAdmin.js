import { createError } from "../utils/errorhandler";

export const isAdmin = (req, res, next) => {
  const isAdmin = req.isAdmin;
  if (!isAdmin) return createError("Forbiden!", 403);
  next();
};
