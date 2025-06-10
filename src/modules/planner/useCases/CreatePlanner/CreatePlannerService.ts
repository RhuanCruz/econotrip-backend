import { Body, Post, Route, Tags, Security, OperationId, Request } from 'tsoa';
import { instanceToInstance } from 'class-transformer';
import { Request as ExpressRequest } from 'express';
import { inject, injectable } from 'inversify';
import { Planner } from '@prisma/client';

import { CreatePlannerType } from './CreatePlannerSchema';
import { Types } from '@src/common/container/';

import IPlannerRepository from '@repositories/IPlannerRepository';

@injectable()
@Route('planners')
@Tags('Planner')
class CreatePlannerService {
  @inject(Types.PlannerRepository) private plannerRepository: IPlannerRepository;

  @Post('/')
  @Security('BearerAuth')
  @OperationId('create_planner')
  public async execute(@Body() data: CreatePlannerType, @Request() req: ExpressRequest): Promise<Planner> {
    const planner = await this.plannerRepository.create({
      userId: req.auth.user!,
      start: data.start,
      end: data.end,
      destination: data.destination,
      content: data.content,
    });

    return instanceToInstance(planner);
  }
}

export { CreatePlannerService };
