import { Router } from 'express';

import LocationController from '@modules/location/infra/http/controllers/LocationController';
import AuthenticationMiddleware from '@src/common/infra/http/middlewares/AuthenticationMiddleware';

const locationController = new LocationController();
const locationRoutes = Router();

locationRoutes.post(
  '/list',
  AuthenticationMiddleware('OPTIONAL'),
  locationController.list,
);

export { locationRoutes };
