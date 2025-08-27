import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';

import { AppContainer } from '@src/common/container';
import { ParseZodError } from '@src/common/errors';
import LocationTypes from '@modules/location/container/types';

import { ListLocationService, ListLocationSchema } from '@src/modules/location/useCases/ListLocation';
import { ListLocation2Service } from '@src/modules/location/useCases/ListLocation2';
import { ListLocationByBookingService } from '@src/modules/location/useCases/ListLocationByBooking';
import { ListLocationByGoogleService } from '@src/modules/location/useCases/ListLocationByGoogle';
import SearchCitiesUseCase from '@modules/location/useCases/SearchCities/SearchCitiesUseCase';

class LocationController {
  public async list(req: Request, res: Response): Promise<void> {
    const data = await ListLocationSchema.parseAsync(req.body).catch((err) => {
      throw ParseZodError(err);
    });

    const response = await AppContainer.resolve(ListLocationService).execute(data);
    res.status(StatusCodes.OK).json(response);
  }

  public async list2(req: Request, res: Response): Promise<void> {
    const data = await ListLocationSchema.parseAsync(req.body).catch((err) => {
      throw ParseZodError(err);
    });
    const response = await AppContainer.resolve(ListLocation2Service).execute(data);
    res.status(StatusCodes.OK).json(response);
  }

  public async listByBooking(req: Request, res: Response): Promise<void> {
    const data = await ListLocationSchema.parseAsync(req.body).catch((err) => {
      throw ParseZodError(err);
    });
    const response = await AppContainer.resolve(ListLocationByBookingService).execute(data);
    res.status(StatusCodes.OK).json(response);
  }

  public async listByGoogle(req: Request, res: Response): Promise<void> {
    const data = await ListLocationSchema.parseAsync(req.body).catch((err) => {
      throw ParseZodError(err);
    });
    const response = await AppContainer.resolve(ListLocationByGoogleService).execute(data);
    res.status(StatusCodes.OK).json(response);
  }

  public async searchCities(req: Request, res: Response): Promise<void> {
    try {
      const { cityName } = req.query;

      if (!cityName || typeof cityName !== 'string') {
        res.status(StatusCodes.BAD_REQUEST).json({
          error: 'Query parameter "q" is required and must be a string',
        });
        return;
      }

      const searchCitiesUseCase = AppContainer.get<SearchCitiesUseCase>(LocationTypes.SearchCitiesUseCase);
      const cities = await searchCitiesUseCase.execute(cityName);
      res.status(StatusCodes.OK).json(cities);
    } catch (error) {
      console.error('Erro ao buscar cidades:', error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error: 'Internal server error',
      });
    }
  }
}

export default LocationController;
