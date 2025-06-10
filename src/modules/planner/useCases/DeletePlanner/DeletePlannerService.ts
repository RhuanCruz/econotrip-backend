import { Delete, OperationId, Path, Route, Security, Tags, SuccessResponse } from 'tsoa';
import { inject, injectable } from 'inversify';

import { AppError, Errors } from '@src/common/errors';
import { Types } from '@src/common/container/';

import IPlannerRepository from '@repositories/IPlannerRepository';

@injectable()
@Route('planners')
@Tags('Planner')
class DeletePlannerService {
  @inject(Types.PlannerRepository) private plannerRepository: IPlannerRepository;

  @Delete('/{plannerId}')
  @Security('BearerAuth')
  @OperationId('delete_planner')
  @SuccessResponse(204)
  public async execute(@Path() plannerId: number): Promise<void> {
    const planner = await this.plannerRepository.findById(plannerId);
    if (!planner) throw AppError.createAppError(Errors.RADAR_NOT_FOUND);

    await this.plannerRepository.delete(plannerId).catch(() => {
      throw AppError.createAppError(Errors.RADAR_NOT_DELETED);
    });
  }
}

export { DeletePlannerService };
