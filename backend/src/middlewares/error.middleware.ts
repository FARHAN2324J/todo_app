import { Request, Response, NextFunction } from "express";

import { AppError } from "../errors/app.error.js";

export function errorHandler(
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
      ...(error.errors && { errors: error.errors }),
    });
  }

  return res.status(500).json({
    message: error.message,
  });
}