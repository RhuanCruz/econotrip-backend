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

locationRoutes.post(
  '/list2',
  AuthenticationMiddleware('OPTIONAL'),
  locationController.list2,
);

locationRoutes.get(
  '/cities/search',
  AuthenticationMiddleware('OPTIONAL'),
  locationController.searchCities,
);

locationRoutes.post(
  '/list-booking',
  AuthenticationMiddleware('OPTIONAL'),
  locationController.listByBooking,
);

locationRoutes.post(
  '/list-google',
  AuthenticationMiddleware('OPTIONAL'),
  locationController.listByGoogle,
);

export { locationRoutes };
