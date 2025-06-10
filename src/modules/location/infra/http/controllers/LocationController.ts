import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';

import { AppContainer } from '@src/common/container';
import { ParseZodError } from '@src/common/errors';

import { ListLocationService, ListLocationSchema } from '@src/modules/location/useCases/ListLocation';

class LocationController {
  public async list(req: Request, res: Response): Promise<void> {
    const data = await ListLocationSchema.parseAsync(req.body).catch((err) => {
      throw ParseZodError(err);
    });

    const response = await AppContainer.resolve(ListLocationService).execute(data);
    res.status(StatusCodes.OK).json(response);
  }
}

export default LocationController;
