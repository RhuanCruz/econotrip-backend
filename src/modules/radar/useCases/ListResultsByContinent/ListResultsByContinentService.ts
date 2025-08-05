import { Get, OperationId, Path, Route, Security, Tags } from 'tsoa';
import { inject, injectable } from 'inversify';

import { Types } from '@src/common/container/';

import ListResultsByContinentResponse from '@src/common/providers/RadarRoutineProvider/responses/ListResultsByContinentResponse';
import IRadarRoutineProvider from '@src/common/providers/RadarRoutineProvider/repositories/IRadarRoutineProvider';

@injectable()
@Route('radars')
@Tags('Radar')
class ListResultsByContinentService {
  @inject(Types.RadarRoutineProvider) private radarRoutineProvider: IRadarRoutineProvider;

  @Get('/continents/{continent}')
  @Security('BearerAuth')
  @OperationId('get_radar_continent_flights')
  public async execute(@Path() continent: string): Promise<ListResultsByContinentResponse> {
    const response = await this.radarRoutineProvider.listResultsByContinent({
      continent,
    });

    return response;
  }
}

export { ListResultsByContinentService };
