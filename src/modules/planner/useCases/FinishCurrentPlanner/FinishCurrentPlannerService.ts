import { Delete, OperationId, Request, Route, Security, Tags, SuccessResponse } from 'tsoa';
import { inject, injectable } from 'inversify';
import { Request as ExpressRequest } from 'express';

import { AppError, Errors } from '@src/common/errors';
import { Types } from '@src/common/container/';

import IPlannerRepository from '@repositories/IPlannerRepository';

@injectable()
@Route('planners')
@Tags('Planner')
class FinishCurrentPlannerService {
  @inject(Types.PlannerRepository) private plannerRepository: IPlannerRepository;

  @Delete('/current/finish')
  @Security('BearerAuth')
  @OperationId('finish_current_planner')
  @SuccessResponse(204)
  public async execute(@Request() req: ExpressRequest): Promise<void> {
    console.log(req.auth);
    if (!req.auth.user) throw AppError.createAppError(Errors.AUTH_UNAUTHORIZED);

    const planner = await this.plannerRepository.findCurrent(req.auth.user);
    if (!planner) throw AppError.createAppError(Errors.RADAR_NOT_FOUND);

    await this.plannerRepository.update(planner.id, { current: false, status: 'FINISHED' }).catch(() => {
      throw AppError.createAppError(Errors.RADAR_NOT_DELETED);
    });
  }
}

export { FinishCurrentPlannerService };
