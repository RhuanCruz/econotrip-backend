import { Request, Response, NextFunction } from 'express';
import { AppContainer, Types } from '@common/container';

import IUserActionLogRepository from '@modules/user/repositories/IUserActionLogRepository';
import IUserActionRepository from '@modules/user/repositories/IUserActionRepository';
import Logger from '@common/logger';

const UserActionLogMiddleware = (userAction: string) => async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const UserActionLogRepository = AppContainer.get<IUserActionLogRepository>(Types.UserActionLogRepository);
  const UserActionRepository = AppContainer.get<IUserActionRepository>(Types.UserActionRepository);
  const action = userAction;

  res.on('finish', async () => {
    const userAct = await UserActionRepository.findByShort(action);
    if (!userAct) {
      Logger.error('Could not found userAction');
      return;
    }

    if (req.auth?.user) {
      await UserActionLogRepository.create({
        userId: req.auth.user,
        actionId: userAct.id,
        payload: { body: req.body, params: req.params, query: req.query },
        timestamp: new Date(),
        ip: req.ip ?? '',
      }).catch(() => {
        Logger.error('Could not create user action log');
      });
    }
  });

  return next();
};

export default UserActionLogMiddleware;
