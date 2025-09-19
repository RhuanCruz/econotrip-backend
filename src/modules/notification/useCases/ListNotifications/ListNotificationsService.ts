import { OperationId, Post, Route, Security, SuccessResponse, Tags, Request } from 'tsoa';
import { inject, injectable } from 'inversify';
import INotificationRepository from '@repositories/INotificationRepository';
import { Notification } from '@prisma/client';
import { Types } from '@src/common/container';
import { AppError, Errors } from '@src/common/errors';
import { Request as ExpressRequest } from 'express';

@injectable()
@Route('notifications')
@Tags('Notification')
class ListNotificationsService {
  constructor(
    @inject(Types.NotificationRepository) private notificationRepository: INotificationRepository,
  ) {}

  @Post('/current/cancel')
  @Security('BearerAuth')
  @OperationId('list_notifications')
  @SuccessResponse(200)
  async execute(@Request() req: ExpressRequest): Promise<Notification[]> {
    if (!req.auth.user) throw AppError.createAppError(Errors.AUTH_UNAUTHORIZED);
    return this.notificationRepository.findAllByUser(req.auth.user);
  }
}

export default ListNotificationsService;
