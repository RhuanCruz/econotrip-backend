import { Router } from 'express';
import PermissionController from '@modules/permission/infra/http/controllers/PermissionController';
import AuthenticationMiddleware from '@src/common/infra/http/middlewares/AuthenticationMiddleware';
import AdminAccessControlMiddleware from '@src/common/infra/http/middlewares/AdminAccessControlMiddleware';

const permissionController = new PermissionController();
const permissionRoutes = Router();

permissionRoutes.post(
  '/',
  AuthenticationMiddleware(),
  AdminAccessControlMiddleware,
  permissionController.create,
);

permissionRoutes.post(
  '/list',
  AuthenticationMiddleware(),
  AdminAccessControlMiddleware,
  permissionController.list,
);

permissionRoutes.get(
  '/:permissionId',
  AuthenticationMiddleware(),
  AdminAccessControlMiddleware,
  permissionController.getById,
);

permissionRoutes.patch(
  '/:permissionId',
  AuthenticationMiddleware(),
  AdminAccessControlMiddleware,
  permissionController.update,
);

permissionRoutes.delete(
  '/:permissionId',
  AuthenticationMiddleware(),
  AdminAccessControlMiddleware,
  permissionController.delete,
);

export default permissionRoutes;
