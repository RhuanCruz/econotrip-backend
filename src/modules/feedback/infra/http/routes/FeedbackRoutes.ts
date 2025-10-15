import { Router } from 'express';
import FeedbackController from '@modules/feedback/infra/http/controllers/FeedbackController';
import AuthenticationMiddleware from '@src/common/infra/http/middlewares/AuthenticationMiddleware';

const feedbackController = new FeedbackController();
const feedbackRoutes = Router();

feedbackRoutes.post(
  '/',
  AuthenticationMiddleware(),
  feedbackController.create,
);

feedbackRoutes.post(
  '/list',
  AuthenticationMiddleware(),
  feedbackController.list,
);

export default feedbackRoutes;
