import { Router } from 'express';
import FlightController from '@modules/flights/infra/http/controllers/FlightController';
import AuthenticationMiddleware from '@src/common/infra/http/middlewares/AuthenticationMiddleware';

const flightsController = new FlightController();
const flightsRoutes = Router();

flightsRoutes.post(
  '/offers/home',
  AuthenticationMiddleware('OPTIONAL'),
  flightsController.getOffersToHome,
);

flightsRoutes.post(
  '/offers/search',
  AuthenticationMiddleware('OPTIONAL'),
  flightsController.searchFlightOffer,
);

flightsRoutes.post(
  '/offers/search/detail',
  AuthenticationMiddleware('OPTIONAL'),
  flightsController.searchFlightOfferDetail,
);

flightsRoutes.post(
  '/mileage/programs/search',
  AuthenticationMiddleware('OPTIONAL'),
  flightsController.searchMileagePrograms,
);

flightsRoutes.post(
  '/mileage/search',
  AuthenticationMiddleware('OPTIONAL'),
  flightsController.searchFlightByMileage,
);

flightsRoutes.post(
  '/mileage/:tripId',
  AuthenticationMiddleware('OPTIONAL'),
  flightsController.getTripsByMileage,
);

export default flightsRoutes;
