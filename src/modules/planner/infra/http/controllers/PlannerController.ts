import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';

import { AppContainer } from '@src/common/container';
import { ParseZodError } from '@src/common/errors';

import { GeneratePlannerService, GeneratePlannerSchema } from '@src/modules/planner/useCases/GeneratePlanner';
import { CreatePlannerService, CreatePlannerSchema } from '@src/modules/planner/useCases/CreatePlanner';
import { UpdatePlannerService, UpdatePlannerSchema } from '@src/modules/planner/useCases/UpdatePlanner';
import { ListPlannerService, ListPlannerSchema } from '@src/modules/planner/useCases/ListPlanner';
import { DeletePlannerService } from '@src/modules/planner/useCases/DeletePlanner';
import { GetCurrentPlannerService } from '@src/modules/planner/useCases/GetCurrentPlanner';
import { GetPlannerService } from '@src/modules/planner/useCases/GetPlanner';

class PlannerController {
  public async create(req: Request, res: Response): Promise<void> {
    const data = await CreatePlannerSchema.parseAsync(req.body).catch((err) => {
      throw ParseZodError(err);
    });

    const response = await AppContainer.resolve(CreatePlannerService).execute(data, req);
    res.status(StatusCodes.CREATED).json(response);
  }

  public async getById(req: Request, res: Response): Promise<void> {
    const { plannerId } = req.params;

    const response = await AppContainer.resolve(GetPlannerService).execute(Number(plannerId));
    res.status(StatusCodes.OK).json(response);
  }

  public async getCurrent(req: Request, res: Response): Promise<void> {
    const response = await AppContainer.resolve(GetCurrentPlannerService).execute(req);
    res.status(StatusCodes.OK).json(response);
  }

  public async list(req: Request, res: Response): Promise<void> {
    const data = await ListPlannerSchema.parseAsync(req.body).catch((err) => {
      throw ParseZodError(err);
    });

    const response = await AppContainer.resolve(ListPlannerService).execute(data, req);
    res.status(StatusCodes.OK).json(response);
  }

  public async update(req: Request, res: Response): Promise<void> {
    const { plannerId } = req.params;

    const data = await UpdatePlannerSchema.parseAsync(req.body).catch((err) => {
      throw ParseZodError(err);
    });

    const response = await AppContainer.resolve(UpdatePlannerService).execute(Number(plannerId), data);
    res.status(StatusCodes.OK).json(response);
  }

  public async delete(req: Request, res: Response): Promise<void> {
    const { plannerId } = req.params;

    const response = await AppContainer.resolve(DeletePlannerService).execute(Number(plannerId));
    res.status(StatusCodes.OK).json(response);
  }

  public async generate(req: Request, res: Response): Promise<void> {
    const data = await GeneratePlannerSchema.parseAsync(req.body).catch((err) => {
      throw ParseZodError(err);
    });

    const response = await AppContainer.resolve(GeneratePlannerService).execute(data);
    res.status(StatusCodes.OK).json(response);
  }
}

export default PlannerController;
