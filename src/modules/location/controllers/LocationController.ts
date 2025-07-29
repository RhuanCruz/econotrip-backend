import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';

import { AppContainer } from '@src/common/container';
import LocationTypes from '@modules/location/container/types';

import SearchCitiesUseCase from '@modules/location/useCases/SearchCities/SearchCitiesUseCase';

class LocationController {
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
