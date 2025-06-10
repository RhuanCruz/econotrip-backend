import { Container } from 'inversify';
import FlightTypes from './types';

import FlighOfferSearchRepository from '@modules/flights/infra/database/repositories/FlighOfferSearchRepository';
import IFlightOfferSearchHistoryRepository from '@modules/flights/repositories/IFlightOfferSearchHistoryRepository';

const FlightContainer = new Container();

FlightContainer.bind<IFlightOfferSearchHistoryRepository>(FlightTypes.FlighOfferSearchRepository).to(FlighOfferSearchRepository);

export default FlightContainer;
