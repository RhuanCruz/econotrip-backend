import { injectable } from 'inversify';
import axios from 'axios';

import { Errors, AppError } from '@src/common/errors';
import Config from '@src/config';

import IAmadeusProvider from '@common/providers/AmadeusProvider/repositories/IAmadeusProvider';
import ISearchFlightOffersDTO from '@common/providers/AmadeusProvider/dtos/ISearchFlightOffersDTO';
import FlightCheapestDateSearchType from '@common/providers/AmadeusProvider/dtos/FlightCheapestDateSearchType';

import ILoginResponse from '@common/providers/AmadeusProvider/responses/ILoginResponse';
import ISearchFlightOffersResponse from '@common/providers/AmadeusProvider/responses/ISearchFlightOffersResponse';
import FlightCheapestDateSearchResponse from '@common/providers/AmadeusProvider/responses/FlightCheapestDateSearchResponse';

@injectable()
class AmadeusProvider implements IAmadeusProvider {
  private api = axios.create({ baseURL: Config.amadeus.url });

  public async login(): Promise<ILoginResponse> {
    const data = {
      client_id: Config.amadeus.key,
      client_secret: Config.amadeus.secret,
      grant_type: 'client_credentials',
    };

    return this.api.post('/v1/security/oauth2/token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
      .then((res) => res.data)
      .catch(() => { throw AppError.createAppError(Errors.AMADEUS_LOGIN_FAILED); });
  }

  public async searchFlightOffers(data: ISearchFlightOffersDTO): Promise<ISearchFlightOffersResponse> {
    const login = await this.login();
    return this.api.post('/v2/shopping/flight-offers', data, { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${login.access_token}` } })
      .then((res) => res.data)
      .catch(() => { throw AppError.createAppError(Errors.AMADEUS_SEARCH_FAILED); });
  }

  public async flightCheapestDateSearch(data: FlightCheapestDateSearchType): Promise<FlightCheapestDateSearchResponse> {
    const login = await this.login();
    return this.api.get('/v1/shopping/flight-dates', { params: data, headers: { Authorization: `Bearer ${login.access_token}` } })
      .then((res) => res.data)
      .catch((err) => { console.log(err); throw AppError.createAppError(Errors.AMADEUS_SEARCH_FAILED); });
  }
}

export default AmadeusProvider;
