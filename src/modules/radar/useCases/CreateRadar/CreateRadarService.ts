import { Body, Post, Route, Tags, Security, OperationId, Request } from 'tsoa';
import { instanceToInstance } from 'class-transformer';
import { Request as ExpressRequest } from 'express';
import { inject, injectable } from 'inversify';
import { Radar } from '@prisma/client';

import { CreateRadarType } from './CreateRadarSchema';
import { Types } from '@src/common/container/';

import IRadarRepository from '@repositories/IRadarRepository';
import IRadarRoutineProvider from '@src/common/providers/RadarRoutineProvider/repositories/IRadarRoutineProvider';

@injectable()
@Route('radars')
@Tags('Radar')
class CreateRadarService {
  @inject(Types.RadarRepository) private radarRepository: IRadarRepository;

  @inject(Types.RadarRoutineProvider) private radarRoutineProvider: IRadarRoutineProvider;

  @Post('/')
  @Security('BearerAuth')
  @OperationId('create_radar')
  public async execute(@Body() data: CreateRadarType, @Request() req: ExpressRequest): Promise<Radar> {
    const radar = await this.radarRepository.create({
      userId: req.auth.user!,
      start: data.start,
      end: data.end,
      origin: data.origin,
      destination: data.destination,
      type: data.type,
      value: data.value,
    });

    const origins = data.origin.split(',');
    const destinations = data.destination.split(',');

    origins.forEach(async (origin) => {
      destinations.forEach(async (destination) => {
        await this.radarRoutineProvider.create({
          origin,
          destination,
          type: data.type,
        }).catch(() => {
          console.error('Could not create radar routine');
        });
      });
    });

    return instanceToInstance(radar);
  }
}

export { CreateRadarService };
