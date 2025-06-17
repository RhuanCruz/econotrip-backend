import { Get, OperationId, Route, Security, Tags, Request } from 'tsoa';
import { instanceToInstance } from 'class-transformer';
import { inject, injectable } from 'inversify';
import { Request as ExpressRequest } from 'express';
import { Planner } from '@prisma/client';

import { AppError, Errors } from '@src/common/errors';
import { Types } from '@src/common/container/';

import IPlannerRepository from '@repositories/IPlannerRepository';

@injectable()
@Route('planners')
@Tags('Planner')
class GetCurrentPlannerService {
  @inject(Types.PlannerRepository) private plannerRepository: IPlannerRepository;

  @Get('/current')
  @Security('BearerAuth')
  @OperationId('get_planner')
  public async execute(@Request() req: ExpressRequest): Promise<Planner> {
    if (!req.auth.user) throw AppError.createAppError(Errors.AUTH_UNAUTHORIZED);

    const planner = await this.plannerRepository.findCurrent(req.auth.user);
    if (!planner) throw AppError.createAppError(Errors.RADAR_NOT_FOUND);

    return instanceToInstance(planner);
  }
}

export { GetCurrentPlannerService };
