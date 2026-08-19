import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/api-error";
import env from "../config/env";

const errorMiddleware = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
    return;
  }

  console.error("Unexpected error:", err);
  res.status(500).json({
    success: false,
    message:
      env.NODE_ENV === "development"
        ? err.message
        : "Something went wrong. Please try again.",
  });
};

export default errorMiddleware;
