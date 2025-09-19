import { Router } from 'express';
import NotificationController from '../controllers/NotificationsController';
import AuthenticationMiddleware from '@src/common/infra/http/middlewares/AuthenticationMiddleware';

const notificationController = new NotificationController();
const notificationRoutes = Router();

notificationRoutes.post(
  '/',
  AuthenticationMiddleware(),
  notificationController.list,
);

export default notificationRoutes;
