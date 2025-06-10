import { Container } from 'inversify';
import Types from './types';

import PermissionContainer from '@modules/permission/container';
import ProviderContainer from '@common/providers/container';
import LocationContainer from '@modules/location/container';
import FlightContainer from '@modules/flights/container';
import UserContainer from '@modules/user/container';
import RadarContainer from '@modules/radar/container';
import PlannerContainer from '@modules/planner/container';

const AppContainer = Container.merge(
  PermissionContainer,
  ProviderContainer,
  LocationContainer,
  FlightContainer,
  UserContainer,
  RadarContainer,
  PlannerContainer,
);

export { AppContainer, Types };
