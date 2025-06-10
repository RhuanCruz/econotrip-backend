import { Body, Post, Route, Tags, Security, OperationId } from 'tsoa';
import { inject, injectable } from 'inversify';

import { SearchFlightsByMileageType } from './SearchFlightsByMileageSchema';
import { SearchFlightsByMileageResponse } from './SearchFlightsByMileageResponse';
import { Types } from '@src/common/container/';

import ISeatsAeroProvider from '@common/providers/SeatsAeroProvider/repositories/ISeatsAeroProvider';

@injectable()
@Route('flights/mileage/search')
@Tags('Flight')
class SearchFlightsByMileageService {
  @inject(Types.SeatsAeroProvider) private seatsAeroProvider: ISeatsAeroProvider;

  @Post('/')
  @Security('BearerAuth')
  @OperationId('search_flight_by_mileage')
  public async execute(@Body() data: SearchFlightsByMileageType): Promise<SearchFlightsByMileageResponse> {
    console.log({
      origin_airport: data.origin,
      destination_airport: data.destination,
      start_date: data.departure,
      end_date: data.return ? data.return : data.departure,
    });

    const response = await this.seatsAeroProvider.searchFlights({
      origin_airport: data.origin,
      destination_airport: data.destination,
      start_date: data.departure,
      end_date: data.return ? data.return : data.departure,
    });

    return response;
  }
}

export { SearchFlightsByMileageService };
