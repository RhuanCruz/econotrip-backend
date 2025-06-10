import { Delete, OperationId, Path, Route, Security, Tags, SuccessResponse } from 'tsoa';
import { inject, injectable } from 'inversify';

import { AppError, Errors } from '@src/common/errors';
import { Types } from '@src/common/container/';

import IRadarRepository from '@repositories/IRadarRepository';

@injectable()
@Route('radars')
@Tags('Radar')
class DeleteRadarService {
  @inject(Types.RadarRepository) private radarRepository: IRadarRepository;

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
  }
}

export { DeleteRadarService };
