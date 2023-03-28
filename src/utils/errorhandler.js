export const errorHandler = (err) => {
  if (!err.statusCode) {
    err.statusCode = 500;
  }
  return err;
};

export const createError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  throw error;
};
