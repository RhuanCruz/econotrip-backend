import { Body, Route, Tags, Security, OperationId, Path, SuccessResponse, Patch } from 'tsoa';
import { inject, injectable } from 'inversify';

import { AppError, Errors } from '@src/common/errors';
import { UpdateRadarType } from './UpdateRadarSchema';
import { Types } from '@src/common/container/';

import IRadarRepository from '@repositories/IRadarRepository';

@injectable()
@Route('radars')
@Tags('Radar')
class UpdateRadarService {
  @inject(Types.RadarRepository) private radarRepository: IRadarRepository;

  @Patch('/{radarId}')
  @Security('BearerAuth')
  @OperationId('update_radar')
  @SuccessResponse(204)
  public async execute(@Path() radarId: number, @Body() data: UpdateRadarType): Promise<void> {
    const radar = await this.radarRepository.findById(radarId);
    if (!radar) throw AppError.createAppError(Errors.USER_NOT_FOUND);

    return this.radarRepository.update(radarId, { ...data });
  }
}

export { UpdateRadarService };
