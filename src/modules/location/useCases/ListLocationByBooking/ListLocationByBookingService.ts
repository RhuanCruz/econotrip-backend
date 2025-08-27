import { Body, OperationId, Post, Route, Security, Tags } from 'tsoa';
import { inject, injectable } from 'inversify';

import { Types } from '@src/common/container';
import { ListLocationType } from '../ListLocation/ListLocationSchema';
import { mapListLocationResponse, StandardLocationResponse } from '../ListLocation/locationMapper';

import IFlightScraperSkyProvider from '@src/common/providers/FlightScraperSkyProvider/repositories/IFlightScraperSkyProvider';
import PersistLocationsService from '@modules/location/services/PersistLocationsService';
import LocationTypes from '@modules/location/container/types';

@injectable()
@Route('locations')
@Tags('Location')
class ListLocationByBookingService {
  @inject(Types.FlightScraperSkyProvider) private flightScraperSkyProvider: IFlightScraperSkyProvider;

  @inject(LocationTypes.PersistLocationsService) private persistLocationsService: PersistLocationsService;

  @Post('/list-booking')
  @Security('BearerAuth')
  @OperationId('list_location_by_booking')
  public async execute(@Body() data: ListLocationType): Promise<StandardLocationResponse> {
    const fullResponse = await this.flightScraperSkyProvider.listLocationsBooking(data.keyword);
    const filtered = fullResponse.data.filter((loc) => loc.type === 'AIRPORT');
    const mapped = mapListLocationResponse({ ...fullResponse, data: filtered }, 'booking');
    this.persistLocationsService.persist(mapped.locations);

    return mapped;
  }
}

export { ListLocationByBookingService };
