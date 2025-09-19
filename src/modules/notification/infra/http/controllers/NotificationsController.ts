import { Request, Response } from 'express';
import ListNotificationsService from '@modules/notification/useCases/ListNotifications/ListNotificationsService';
import { AppContainer } from '@src/common/container';
import { StatusCodes } from 'http-status-codes';

class NotificationController {
  async list(req: Request, res: Response): Promise<void> {
    const response = await AppContainer.resolve(ListNotificationsService).execute(req);
    res.status(StatusCodes.OK).json(response);
  }
}

export default NotificationController;
