import { Delete, OperationId, Path, Route, Security, Tags, SuccessResponse } from 'tsoa';
import { inject, injectable } from 'inversify';

import { AppError, Errors } from '@src/common/errors';
import { Types } from '@src/common/container/';

import IRadarRepository from '@repositories/IRadarRepository';
import IRadarRoutineProvider from '@src/common/providers/RadarRoutineProvider/repositories/IRadarRoutineProvider';

@injectable()
@Route('radars')
@Tags('Radar')
class DeleteRadarService {
  @inject(Types.RadarRepository) private radarRepository: IRadarRepository;

  @inject(Types.RadarRoutineProvider) private radarRoutineProvider: IRadarRoutineProvider;

  @Delete('/{radarId}')
  @Security('BearerAuth')
  @OperationId('delete_radar')
  @SuccessResponse(204)
  public async execute(@Path() radarId: number): Promise<void> {
    const radar = await this.radarRepository.findById(radarId);
    if (!radar) throw AppError.createAppError(Errors.RADAR_NOT_FOUND);

    await this.radarRepository.delete(radarId).catch(() => {
      throw AppError.createAppError(Errors.RADAR_NOT_DELETED);
    });

    const leftRadarsWithOriginAndDestination = await this.radarRepository.list({
      where: {
        origin: radar.origin,
        destination: radar.destination,
      },
    });

    if (leftRadarsWithOriginAndDestination.length === 0) {
      await this.radarRoutineProvider.delete({
        origin: radar.origin,
        destination: radar.destination,
        type: 'MONEY',
      });
    }
  }
}

export { DeleteRadarService };
