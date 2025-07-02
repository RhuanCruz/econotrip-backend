import { Body, OperationId, Post, Route, Security, Tags } from 'tsoa';
import { inject, injectable } from 'inversify';

import { Types } from '@src/common/container';
import { ListLocationType } from './ListLocationSchema';

import IListLocationResponse from '@src/common/providers/FlightScraperSkyProvider/responses/IListLocationResponse';
import IFlightScraperSkyProvider from '@src/common/providers/FlightScraperSkyProvider/repositories/IFlightScraperSkyProvider';

@injectable()
@Route('locations')
@Tags('Location')
class ListLocationService {
  @inject(Types.FlightScraperSkyProvider) private flightScraperSkyProvider: IFlightScraperSkyProvider;

  @Post('/list')
  @Security('BearerAuth')
  @OperationId('list_location')
  public async execute(@Body() data: ListLocationType): Promise<IListLocationResponse> {
    return this.flightScraperSkyProvider.listLocations(data.keyword);
  }
}

export { ListLocationService };
