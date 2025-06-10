import { Body, Route, Tags, Security, OperationId, Path, SuccessResponse, Patch } from 'tsoa';
import { inject, injectable } from 'inversify';

import { AppError, Errors } from '@src/common/errors';
import { UpdatePlannerType } from './UpdatePlannerSchema';
import { Types } from '@src/common/container/';

import IPlannerRepository from '@repositories/IPlannerRepository';

@injectable()
@Route('planners')
@Tags('Planner')
class UpdatePlannerService {
  @inject(Types.PlannerRepository) private plannerRepository: IPlannerRepository;

  @Patch('/{plannerId}')
  @Security('BearerAuth')
  @OperationId('update_planner')
  @SuccessResponse(204)
  public async execute(@Path() plannerId: number, @Body() data: UpdatePlannerType): Promise<void> {
    const planner = await this.plannerRepository.findById(plannerId);
    if (!planner) throw AppError.createAppError(Errors.USER_NOT_FOUND);

    return this.plannerRepository.update(plannerId, { ...data });
  }
}

export { UpdatePlannerService };
