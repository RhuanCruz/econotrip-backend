import { Router } from 'express';
import PlannerController from '@modules/planner/infra/http/controllers/PlannerController';
import AuthenticationMiddleware from '@src/common/infra/http/middlewares/AuthenticationMiddleware';

const plannerController = new PlannerController();
const plannerRoutes = Router();

plannerRoutes.post(
  '/',
  AuthenticationMiddleware(),
  plannerController.create,
);

plannerRoutes.post(
  '/list',
  AuthenticationMiddleware(),
  plannerController.list,
);

plannerRoutes.post(
  '/generate',
  AuthenticationMiddleware(),
  plannerController.generate,
);

plannerRoutes.get(
  '/current',
  AuthenticationMiddleware(),
  plannerController.getCurrent,
);

plannerRoutes.get(
  '/:plannerId',
  AuthenticationMiddleware(),
  plannerController.getById,
);

plannerRoutes.patch(
  '/:plannerId',
  AuthenticationMiddleware(),
  plannerController.update,
);

plannerRoutes.patch(
  '/current/cancel',
  AuthenticationMiddleware(),
  plannerController.cancelCurrent,
);

plannerRoutes.delete(
  '/:plannerId',
  AuthenticationMiddleware(),
  plannerController.delete,
);

export default plannerRoutes;
