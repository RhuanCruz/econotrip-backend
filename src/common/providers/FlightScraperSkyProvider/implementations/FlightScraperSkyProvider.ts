import { injectable } from 'inversify';
import axios from 'axios';

import { Errors, AppError } from '@src/common/errors';
import Config from '@src/config';

import IFlightScraperSkyProvider from '@common/providers/FlightScraperSkyProvider/repositories/IFlightScraperSkyProvider';
import IListLocationResponse from '../responses/IListLocationResponse';

@injectable()
class FlightScraperSkyProvider implements IFlightScraperSkyProvider {
  private api = axios.create({ baseURL: Config.flightScraperSky.url });

  public async listLocations(query: string): Promise<IListLocationResponse> {
    return this.api.get('/flights/auto-complete', {
      params: {
        query,
        locale: 'pt-BR',
      },
      headers: {
        'x-rapidapi-key': Config.flightScraperSky.apiKey,
        'x-rapidapi-host': 'flights-sky.p.rapidapi.com',
      } })
      .then((res) => res.data)
      .catch((err) => { console.log(err); throw AppError.createAppError(Errors.FLIGHT_SCRAPER_SKY_NOT_LIST_LOCATIONS); });
  }
}

export default FlightScraperSkyProvider;
