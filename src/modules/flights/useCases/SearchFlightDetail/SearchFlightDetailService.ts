import { Body, Post, Route, Tags, Security, OperationId } from 'tsoa';
import { inject, injectable } from 'inversify';

import { SearchFlightDetailType } from './SearchFlightDetailSchema';
import { Types } from '@src/common/container';

import IFlightScraperSkyProvider from '@src/common/providers/FlightScraperSkyProvider/repositories/IFlightScraperSkyProvider';
import ISearchDetailResponse from '@src/common/providers/FlightScraperSkyProvider/responses/ISearchDetailResponse';

@injectable()
@Route('flights/skyscrapper/search/detail')
@Tags('Flight')
class SearchFlightDetailService {
  @inject(Types.FlightScraperSkyProvider) private flightScraperSkyProvider: IFlightScraperSkyProvider;

  @Post('/')
  @Security('BearerAuth')
  @OperationId('search_flight_detail')
  public async execute(@Body() data: SearchFlightDetailType): Promise<ISearchDetailResponse> {
    return this.flightScraperSkyProvider.getDetails(data);
  }
}

export { SearchFlightDetailService };
