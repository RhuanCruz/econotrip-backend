import { Container } from 'inversify';
import LocationTypes from './types';

import LocationRepository from '@modules/location/infra/database/repositories/LocationRepository';
import ILocationRepository from '@modules/location/repositories/ILocationRepository';

const UserContainer = new Container();

UserContainer.bind<ILocationRepository>(LocationTypes.LocationRepository).to(LocationRepository);

export default UserContainer;
