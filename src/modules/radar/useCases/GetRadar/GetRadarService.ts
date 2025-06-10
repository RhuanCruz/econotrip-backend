import { Get, OperationId, Path, Route, Security, Tags } from 'tsoa';
import { instanceToInstance } from 'class-transformer';
import { inject, injectable } from 'inversify';
import { Radar } from '@prisma/client';

import { AppError, Errors } from '@src/common/errors';
import { Types } from '@src/common/container/';

import IRadarRepository from '@repositories/IRadarRepository';

@injectable()
@Route('radars')
@Tags('Radar')
class GetRadarService {
  @inject(Types.RadarRepository) private radarRepository: IRadarRepository;

  @Get('/{radarId}')
  @Security('BearerAuth')
  @OperationId('get_radar')
  public async execute(@Path() radarId: number): Promise<Radar> {
    const radar = await this.radarRepository.findById(radarId);
    if (!radar) throw AppError.createAppError(Errors.RADAR_NOT_FOUND);

    return instanceToInstance(radar);
  }
}

export { GetRadarService };
