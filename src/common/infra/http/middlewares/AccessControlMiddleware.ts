import { Request, Response, NextFunction } from 'express';
import { AppError, Errors } from '@common/errors';

const AccessControlMiddleware = (permissions: Array<string>) => async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
  const hasPermission = permissions.some((perm) => req.auth.permissions.includes(perm));
  if (!hasPermission && !req.auth.admin) throw AppError.createAppError(Errors.AUTH_FORBIDDEN);
  return next();
};

export default AccessControlMiddleware;
