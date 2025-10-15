import { Router } from 'express';

import { locationRoutes } from '@src/modules/location/infra/http/routes/LocationRoutes';
import permissionsRoutes from '@src/modules/permission/infra/http/routes/PermissionRoutes';
import flightRoute from '@src/modules/flights/infra/http/routes/FlightRoute';
import roleRoutes from '@src/modules/permission/infra/http/routes/RoleRoutes';
import userRoutes from '@src/modules/user/infra/http/routes/UserRoutes';
import authRoutes from '@src/modules/auth/infra/http/routes/AuthRoutes';
import radarRoutes from '@src/modules/radar/infra/http/routes/RadarRoutes';
import plannerRoutes from '@src/modules/planner/infra/http/routes/PlannerRoutes';
import feedbackRoutes from '@src/modules/feedback/infra/http/routes/FeedbackRoutes';

const routes = Router();

routes.use('/permissions', permissionsRoutes);
routes.use('/locations', locationRoutes);
routes.use('/flights', flightRoute);
routes.use('/roles', roleRoutes);
routes.use('/users', userRoutes);
routes.use('/auth', authRoutes);
routes.use('/radars', radarRoutes);
routes.use('/planners', plannerRoutes);
routes.use('/feedback', feedbackRoutes);

export default routes;
