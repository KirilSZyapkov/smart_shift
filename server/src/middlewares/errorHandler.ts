import type {Request, Response, NextFunction} from "express";
import {AppError} from "../errors/AppError";
import {ErrorCode} from "../errors/errorCodes";

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if(err instanceof AppError){
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      code: err.code
    });
  }

  console.error("Unhandled error:", err);

  return res.status(500).json({
    success: false,
    message: "Internal server error!",
    code: ErrorCode.INTERNAL_SERVER_ERROR
  })
}