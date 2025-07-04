import { Body, Post, Route, Tags, Security, OperationId } from 'tsoa';
import { inject, injectable } from 'inversify';

import { SearchFlightType } from './SearchFlightSchema';
import { Types } from '@src/common/container/';

import IFlightScraperSkyProvider from '@src/common/providers/FlightScraperSkyProvider/repositories/IFlightScraperSkyProvider';
import ISearchFlightResponse from '@src/common/providers/FlightScraperSkyProvider/responses/ISearchFlightResponse';

@injectable()
@Route('flights/skyscrapper/search')
@Tags('Flight')
class SearchFlightService {
  @inject(Types.FlightScraperSkyProvider) private flightScraperSkyProvider: IFlightScraperSkyProvider;

  @Post('/')
  @Security('BearerAuth')
  @OperationId('search_flight')
  public async execute(@Body() data: SearchFlightType): Promise<ISearchFlightResponse> {
    if (!data.return) {
      return this.flightScraperSkyProvider.searchOneWay({
        departDate: data.departure,
        fromEntityId: data.origin,
        toEntityId: data.destination,
      });
    }

    return this.flightScraperSkyProvider.searchORoundTrip({
      departDate: data.departure,
      returnDate: data.return,
      fromEntityId: data.origin,
      toEntityId: data.destination,
    });
  }
}

export { SearchFlightService };
