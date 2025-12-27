import {ErrorCode} from "./errorCodes";

export class AppError extends Error{
  public readonly statusCode: number;
  public readonly code: ErrorCode;
  public readonly isOperational: boolean | undefined;

  constructor(
    message: string,
    statusCode: number,
    code: ErrorCode,
    isOperational?: true
  ) {
    super(message);

    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }
}