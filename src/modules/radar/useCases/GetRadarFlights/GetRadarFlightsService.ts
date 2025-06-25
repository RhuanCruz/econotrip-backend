import { Get, OperationId, Path, Route, Security, Tags } from 'tsoa';
import { inject, injectable } from 'inversify';

import { AppError, Errors } from '@src/common/errors';
import { Types } from '@src/common/container/';

import IRadarRepository from '@repositories/IRadarRepository';
import ListRoutineResultResponse from '@src/common/providers/RadarRoutineProvider/responses/ListRoutineResultResponse';
import IRadarRoutineProvider from '@src/common/providers/RadarRoutineProvider/repositories/IRadarRoutineProvider';

@injectable()
@Route('radars')
@Tags('Radar')
class GetRadarFlightsService {
  @inject(Types.RadarRepository) private radarRepository: IRadarRepository;

  @inject(Types.RadarRoutineProvider) private radarRoutineProvider: IRadarRoutineProvider;

  @Get('/{radarId}/flights')
  @Security('BearerAuth')
  @OperationId('get_radar_flights')
  public async execute(@Path() radarId: number): Promise<ListRoutineResultResponse> {
    const radar = await this.radarRepository.findById(radarId);
    if (!radar) throw AppError.createAppError(Errors.RADAR_NOT_FOUND);

    const response = await this.radarRoutineProvider.listResults({
      origin: radar.origin,
      destination: radar.destination,
      type: 'MONEY',
      periodStart: radar.start.toLocaleDateString('en-CA'),
      periodEnd: radar.end.toLocaleDateString('en-CA'),
    });

    return response;
  }
}

export { GetRadarFlightsService };
