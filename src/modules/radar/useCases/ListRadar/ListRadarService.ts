import { Body, OperationId, Post, Request, Route, Security, Tags } from 'tsoa';
import { inject, injectable } from 'inversify';
import { Radar } from '@prisma/client';

import { BuildPagination, PaginationResponse } from '@utils/PaginationUtils';
import { Types } from '@src/common/container';
import { ListRadarType } from './ListRadarSchema';

import IRadarRepository from '@repositories/IRadarRepository';
import { Request as ExpressRequest } from 'express';
import { AppError, Errors } from '@src/common/errors';

@injectable()
@Route('radars')
@Tags('Radar')
class ListRadarService {
  @inject(Types.RadarRepository) private radarRepository: IRadarRepository;

  @Post('/list')
  @Security('BearerAuth')
  @OperationId('list_radar')
  public async execute(@Body() data: ListRadarType, @Request() req: ExpressRequest): Promise<PaginationResponse<Radar>> {
    if (!req.auth.user) throw AppError.createAppError(Errors.AUTH_TOKEN_INCORRECT);
    const radars = await this.radarRepository.list({ where: { userId: req.auth.user } });
    return BuildPagination(radars, data.dataControl.offset, 0);
  }
}

export { ListRadarService };
