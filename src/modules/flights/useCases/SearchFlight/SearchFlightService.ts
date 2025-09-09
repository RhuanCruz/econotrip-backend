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
    const origins = data.origin.split(',');
    const destinations = data.destination.split(',');

    const promises: Promise<ISearchFlightResponse>[] = [];

    origins.forEach((origin) => {
      destinations.forEach((destination) => {
        if (!data.return) {
          promises.push(this.flightScraperSkyProvider.searchOneWay({
            departDate: data.departure,
            fromEntityId: origin,
            toEntityId: destination,
          }));
        } else {
          promises.push(this.flightScraperSkyProvider.searchORoundTrip({
            departDate: data.departure,
            returnDate: data.return,
            fromEntityId: origin,
            toEntityId: destination,
          }));
        }
      });
    });

    const results = await Promise.all(promises);
    const mergedItineraries = results.flatMap((result) => result.data?.itineraries ?? []);

    const response: ISearchFlightResponse = {
      data: {
        ...results[0].data,
        itineraries: mergedItineraries,
      },
      status: results[0].status,
      message: results[0].message,
    };

    return response;
  }
}

export { SearchFlightService };
