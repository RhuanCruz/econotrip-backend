import { Body, Post, Route, Tags, Security, OperationId, Request } from 'tsoa';
import { instanceToInstance } from 'class-transformer';
import { Request as ExpressRequest } from 'express';
import { inject, injectable } from 'inversify';
import { Radar } from '@prisma/client';

import { CreateRadarType } from './CreateRadarSchema';
import { Types } from '@src/common/container/';

import IRadarRepository from '@repositories/IRadarRepository';

@injectable()
@Route('radars')
@Tags('Radar')
class CreateRadarService {
  @inject(Types.RadarRepository) private radarRepository: IRadarRepository;

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
    });

    return instanceToInstance(radar);
  }
}

export { CreateRadarService };
