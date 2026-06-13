import { ApiError } from "./ApiError.js";

const errorHandler = (err, req, res, next) => {
  console.error("ACTUAL ERROR =>", err);

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      statusCode: err.statusCode,
      success: err.success,
      message: err.message,
      errors: err.errors,
    });
  }

  return res.status(500).json({
    success: false,
    message: err.message,
  });
};

export default errorHandler;