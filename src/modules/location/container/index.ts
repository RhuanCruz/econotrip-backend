import { Container } from 'inversify';
import LocationTypes from './types';

import LocationRepository from '@modules/location/infra/database/repositories/LocationRepository';
import ILocationRepository from '@modules/location/repositories/ILocationRepository';
import SearchCitiesUseCase from '@modules/location/useCases/SearchCities/SearchCitiesUseCase';

const UserContainer = new Container();

UserContainer.bind<ILocationRepository>(LocationTypes.LocationRepository).to(LocationRepository);
UserContainer.bind<SearchCitiesUseCase>(LocationTypes.SearchCitiesUseCase).to(SearchCitiesUseCase);

export default UserContainer;
