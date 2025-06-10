import { Get, OperationId, Path, Route, Security, Tags } from 'tsoa';
import { instanceToInstance } from 'class-transformer';
import { inject, injectable } from 'inversify';
import { Planner } from '@prisma/client';

import { AppError, Errors } from '@src/common/errors';
import { Types } from '@src/common/container/';

import IPlannerRepository from '@repositories/IPlannerRepository';

@injectable()
@Route('planners')
@Tags('Planner')
class GetPlannerService {
  @inject(Types.PlannerRepository) private plannerRepository: IPlannerRepository;

  @Get('/{plannerId}')
  @Security('BearerAuth')
  @OperationId('get_planner')
  public async execute(@Path() plannerId: number): Promise<Planner> {
    const planner = await this.plannerRepository.findById(plannerId);
    if (!planner) throw AppError.createAppError(Errors.RADAR_NOT_FOUND);

    return instanceToInstance(planner);
  }
}

export { GetPlannerService };
