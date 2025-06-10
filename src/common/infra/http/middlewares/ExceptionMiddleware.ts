/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { AppError, Errors } from '@common/errors';

const ExceptionMiddleware = (err: Error, _req: Request, res: Response, _next: NextFunction): void => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json(err);
    return;
  }

  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(AppError.createAppError(Errors.UNDOCUMENTED_ERROR, err.message));
};

export default ExceptionMiddleware;
