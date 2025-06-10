import { Body, OperationId, Post, Request, Route, Security, Tags } from 'tsoa';
import { inject, injectable } from 'inversify';
import { Planner } from '@prisma/client';

import { BuildPagination, PaginationResponse } from '@utils/PaginationUtils';
import { Types } from '@src/common/container';
import { ListPlannerType } from './ListPlannerSchema';

import IPlannerRepository from '@repositories/IPlannerRepository';
import { Request as ExpressRequest } from 'express';
import { AppError, Errors } from '@src/common/errors';

@injectable()
@Route('planners')
@Tags('Planner')
class ListPlannerService {
  @inject(Types.PlannerRepository) private plannerRepository: IPlannerRepository;

  @Post('/list')
  @Security('BearerAuth')
  @OperationId('list_planner')
  public async execute(@Body() data: ListPlannerType, @Request() req: ExpressRequest): Promise<PaginationResponse<Planner>> {
    if (!req.auth.user) throw AppError.createAppError(Errors.AUTH_TOKEN_INCORRECT);
    const planners = await this.plannerRepository.list({ where: { userId: req.auth.user } });
    return BuildPagination(planners, data.dataControl.offset, 0);
  }
}

export { ListPlannerService };
