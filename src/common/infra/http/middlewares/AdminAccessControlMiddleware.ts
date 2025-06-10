import { Request, Response, NextFunction } from 'express';
import { AppError, Errors } from '@common/errors';

const AdminAccessControlMiddleware = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
  if (!req.auth.admin) throw AppError.createAppError(Errors.AUTH_FORBIDDEN);
  return next();
};

export default AdminAccessControlMiddleware;
