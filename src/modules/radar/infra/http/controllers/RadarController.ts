import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';

import { AppContainer } from '@src/common/container';
import { ParseZodError } from '@src/common/errors';

import { CreateRadarService, CreateRadarSchema } from '@src/modules/radar/useCases/CreateRadar';
import { UpdateRadarService, UpdateRadarSchema } from '@src/modules/radar/useCases/UpdateRadar';
import { ListRadarService, ListRadarSchema } from '@src/modules/radar/useCases/ListRadar';
import { DeleteRadarService } from '@src/modules/radar/useCases/DeleteRadar';
import { GetRadarFlightsService } from '@src/modules/radar/useCases/GetRadarFlights';
import { GetRadarService } from '@src/modules/radar/useCases/GetRadar';

class RadarController {
  public async create(req: Request, res: Response): Promise<void> {
    const data = await CreateRadarSchema.parseAsync(req.body).catch((err) => {
      throw ParseZodError(err);
    });

    const response = await AppContainer.resolve(CreateRadarService).execute(data, req);
    res.status(StatusCodes.CREATED).json(response);
  }

  public async getById(req: Request, res: Response): Promise<void> {
    const { radarId } = req.params;

    const response = await AppContainer.resolve(GetRadarService).execute(Number(radarId));
    res.status(StatusCodes.OK).json(response);
  }

  public async list(req: Request, res: Response): Promise<void> {
    const data = await ListRadarSchema.parseAsync(req.body).catch((err) => {
      throw ParseZodError(err);
    });

    const response = await AppContainer.resolve(ListRadarService).execute(data, req);
    res.status(StatusCodes.OK).json(response);
  }

  public async update(req: Request, res: Response): Promise<void> {
    const { radarId } = req.params;

    const data = await UpdateRadarSchema.parseAsync(req.body).catch((err) => {
      throw ParseZodError(err);
    });

    const response = await AppContainer.resolve(UpdateRadarService).execute(Number(radarId), data);
    res.status(StatusCodes.OK).json(response);
  }

  public async delete(req: Request, res: Response): Promise<void> {
    const { radarId } = req.params;

    const response = await AppContainer.resolve(DeleteRadarService).execute(Number(radarId));
    res.status(StatusCodes.OK).json(response);
  }

  public async getFlights(req: Request, res: Response): Promise<void> {
    const { radarId } = req.params;

    const response = await AppContainer.resolve(GetRadarFlightsService).execute(Number(radarId));
    res.status(StatusCodes.OK).json(response);
  }
}

export default RadarController;
