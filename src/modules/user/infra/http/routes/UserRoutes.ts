import { Router } from 'express';
import UserController from '@modules/user/infra/http/controllers/UserController';
import AuthenticationMiddleware from '@src/common/infra/http/middlewares/AuthenticationMiddleware';
import AccessControlMiddleware from '@src/common/infra/http/middlewares/AccessControlMiddleware';

const userController = new UserController();
const userRoutes = Router();

userRoutes.post(
  '/',
  AuthenticationMiddleware('OPTIONAL'),
  // AccessControlMiddleware(['CREATE_USER_ANY']),
  userController.create,
);

userRoutes.post(
  '/list',
  AuthenticationMiddleware(),
  AccessControlMiddleware(['GET_USER_ANY', 'GET_USER_OWN']),
  userController.list,
);

userRoutes.post(
  '/check',
  userController.checkExistence,
);

userRoutes.post(
  '/forgot-password',
  userController.forgotPassword,
);

userRoutes.post(
  '/reset-password',
  userController.resetPassword,
);

userRoutes.get(
  '/:userId',
  AuthenticationMiddleware(),
  // AccessControlMiddleware(['GET_USER_ANY', 'GET_USER_OWN']),
  userController.getById,
);

userRoutes.patch(
  '/:userId',
  AuthenticationMiddleware(),
  // AccessControlMiddleware(['UPDATE_USER_ANY', 'UPDATE_USER_OWN']),
  userController.update,
);

userRoutes.delete(
  '/:userId',
  AuthenticationMiddleware(),
  // AccessControlMiddleware(['DELETE_USER_ANY', 'DELETE_USER_OWN']),
  userController.delete,
);

userRoutes.post(
  '/push-subscription',
  AuthenticationMiddleware(),
  userController.savePushSubscription,
);

export default userRoutes;
