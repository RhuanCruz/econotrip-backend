import { injectable } from 'inversify';
import axios from 'axios';

import { Errors, AppError } from '@src/common/errors';
import Config from '@src/config';

import IFlightScraperSkyProvider from '@common/providers/FlightScraperSkyProvider/repositories/IFlightScraperSkyProvider';
import IListLocationResponse from '../responses/IListLocationResponse';
import IFilterSearchOneWayDTO from '../dtos/IFilterSearchOneWayDTO';
import IFilterSearchRoundTripDTO from '../dtos/IFilterSearchRoundTripDTO';
import ISearchFlightResponse from '../responses/ISearchFlightResponse';
import IGetSearchDetailDTO from '../dtos/IGetSearchDetailDTO';
import ISearchDetailResponse from '../responses/ISearchDetailResponse';

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

  public async searchOneWay(filters: IFilterSearchOneWayDTO): Promise<ISearchFlightResponse> {
    return this.api.get('/flights/search-one-way', {
      params: {
        ...filters,
        locale: 'pt-BR',
        currency: 'BRL',
      },
      headers: {
        'x-rapidapi-key': Config.flightScraperSky.apiKey,
        'x-rapidapi-host': 'flights-sky.p.rapidapi.com',
      } })
      .then((res) => res.data)
      .catch((err) => { console.log(err); throw AppError.createAppError(Errors.FLIGHT_SCRAPER_SKY_NOT_SEARCH_ONE_WAY); });
  }

  public async searchORoundTrip(filters: IFilterSearchRoundTripDTO): Promise<ISearchFlightResponse> {
    return this.api.get('/flights/search-roundtrip', {
      params: {
        ...filters,
        locale: 'pt-BR',
        currency: 'BRL',
      },
      headers: {
        'x-rapidapi-key': Config.flightScraperSky.apiKey,
        'x-rapidapi-host': 'flights-sky.p.rapidapi.com',
      } })
      .then((res) => res.data)
      .catch((err) => { console.log(err); throw AppError.createAppError(Errors.FLIGHT_SCRAPER_SKY_NOT_SEARCH_ONE_WAY); });
  }

  public async getDetails(data: IGetSearchDetailDTO): Promise<ISearchDetailResponse> {
    return this.api.get('/flights/detail', {
      params: {
        ...data,
        locale: 'pt-BR',
        currency: 'BRL',
      },
      headers: {
        'x-rapidapi-key': Config.flightScraperSky.apiKey,
        'x-rapidapi-host': 'flights-sky.p.rapidapi.com',
      } })
      .then((res) => res.data)
      .catch((err) => { console.log(err); throw AppError.createAppError(Errors.FLIGHT_SCRAPER_SKY_NOT_SEARCH_ONE_WAY); });
  }
}

export default FlightScraperSkyProvider;
