import { Router } from 'express';
import RoleController from '@modules/permission/infra/http/controllers/RoleController';
import AuthenticationMiddleware from '@src/common/infra/http/middlewares/AuthenticationMiddleware';
import AdminAccessControlMiddleware from '@src/common/infra/http/middlewares/AdminAccessControlMiddleware';

const roleController = new RoleController();
const roleRoutes = Router();

roleRoutes.post(
  '/',
  AuthenticationMiddleware(),
  AdminAccessControlMiddleware,
  roleController.create,
);

roleRoutes.post(
  '/list',
  AuthenticationMiddleware(),
  AdminAccessControlMiddleware,
  roleController.list,
);

roleRoutes.get(
  '/:roleId',
  AuthenticationMiddleware(),
  AdminAccessControlMiddleware,
  roleController.getById,
);

roleRoutes.patch(
  '/:roleId',
  AuthenticationMiddleware(),
  AdminAccessControlMiddleware,
  roleController.update,
);

roleRoutes.delete(
  '/:roleId',
  AuthenticationMiddleware(),
  AdminAccessControlMiddleware,
  roleController.delete,
);

roleRoutes.post(
  '/:roleId/permissions',
  AuthenticationMiddleware(),
  AdminAccessControlMiddleware,
  roleController.addPermission,
);

roleRoutes.delete(
  '/:roleId/permissions',
  AuthenticationMiddleware(),
  AdminAccessControlMiddleware,
  roleController.removePermission,
);

export default roleRoutes;
