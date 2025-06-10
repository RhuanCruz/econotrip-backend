import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import { AppContainer, Types } from '@src/common/container';
import { AppError, Errors } from '@common/errors';

import IUserRepository from '@repositories/IUserRepository';
import Config from '@src/config';

type AuthenticationType = ('REQUIRED' | 'OPTIONAL');
type IDecodedParams = { userId: number; permissions: Array<string>; }

const DecodeAuthToken = <T>(token: string, key: string): Promise<T> => new Promise((resolve, reject) => {
  verify(token, key, {}, (err, decoded) => {
    if (err) reject(err);
    resolve(decoded as T);
  });
});

const AuthenticationMiddleware = (type: AuthenticationType = 'REQUIRED') => async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
  const UserRepository = AppContainer.get<IUserRepository>(Types.UserRepository);

  if ((!req.headers.authorization && type === 'OPTIONAL')) {
    req.auth = { user: null, admin: false, permissions: [] };
    return next();
  }

  if (!req.headers.authorization) {
    throw AppError.createAppError(Errors.AUTH_UNAUTHORIZED);
  }

  const authHeader = req.headers.authorization;
  const [tokenType, token] = authHeader.split(' ');

  if (tokenType !== 'Bearer') {
    throw AppError.createAppError(Errors.AUTH_TYPE_NOT_SUPPORTED);
  }

  const decoded = await DecodeAuthToken<IDecodedParams>(token, Config.auth.accessTokenSecret).catch(() => {
    throw AppError.createAppError(Errors.AUTH_TYPE_NOT_SUPPORTED);
  });

  const user = await UserRepository.findById(decoded.userId);
  if (!user) throw AppError.createAppError(Errors.AUTH_UNAUTHORIZED);

  req.auth = { user: user.id, admin: user.admin, permissions: decoded.permissions };
  return next();
};

export default AuthenticationMiddleware;
