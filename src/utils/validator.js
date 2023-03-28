import { validationResult } from 'express-validator';

const validatorRequest = (req) => {
  const errorObj = validationResult(req);
  if (!errorObj.isEmpty()) {
    const err = new Error(
      `Validation failed from ${errorObj.errors[0]?.param}: ${errorObj.errors[0]?.msg} `
    );
    err.statusCode = 422;
    err.data = errorObj.array();
    throw err;
  }
};
export default validatorRequest;
