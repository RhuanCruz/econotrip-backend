import { StatusCodes } from 'http-status-codes';
import { ZodError, ZodIssueCode } from 'zod';

import { Errors, AppError } from './index';
import AppErrorDetail from './AppErrorDetail';

const ParseZodIssuesToInternalError = (zodIssue: ZodIssueCode) => {
  if (zodIssue === 'invalid_type') return Errors.ZOD_REQUIRED_FIELD;
  if (zodIssue === 'unrecognized_keys') return Errors.ZOD_UNRECOGNIZED_FIELD;
  return Errors.ZOD_DEFAULT_ISSUE;
};

const ParseZodValidationError = (zodErrors: ZodError): AppError => {
  const errors = zodErrors.errors.map((err) => new AppErrorDetail(
    ParseZodIssuesToInternalError(err.code).title,
    ParseZodIssuesToInternalError(err.code).detail,
    ParseZodIssuesToInternalError(err.code).code,
    err.message,
    err.path ? err.path.join('.') : null,
  ));

  return new AppError({ status: StatusCodes.BAD_REQUEST, errors });
};

export default ParseZodValidationError;
