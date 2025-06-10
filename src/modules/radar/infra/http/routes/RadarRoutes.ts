import { Router } from 'express';
import RadarController from '@modules/radar/infra/http/controllers/RadarController';
import AuthenticationMiddleware from '@src/common/infra/http/middlewares/AuthenticationMiddleware';

const radarController = new RadarController();
const radarRoutes = Router();

radarRoutes.post(
  '/',
  AuthenticationMiddleware(),
  radarController.create,
);

radarRoutes.post(
  '/list',
  AuthenticationMiddleware(),
  radarController.list,
);

radarRoutes.get(
  '/:radarId',
  AuthenticationMiddleware(),
  radarController.getById,
);

radarRoutes.patch(
  '/:radarId',
  AuthenticationMiddleware(),
  radarController.update,
);

radarRoutes.delete(
  '/:radarId',
  AuthenticationMiddleware(),
  radarController.delete,
);

radarRoutes.get(
  '/:radarId/flights',
  AuthenticationMiddleware(),
  radarController.getFlights,
);

export default radarRoutes;
