/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-restricted-syntax */
import { injectable } from 'inversify';
import axios from 'axios';

import { Errors, AppError } from '@src/common/errors';
import Config from '@src/config';
import ISeatsAeroProvider from '@common/providers/SeatsAeroProvider/repositories/ISeatsAeroProvider';
import SeatsAeroSearchFlightDTO from '../dtos/SeatsAeroSearchFlightDTO';
import SearchFlightsByMileageResponse from '../responses/SearchFlightsByMileageResponse';
import { GetTripByMileageResponse } from '../responses/GetTripsByMileageResponse';

@injectable()
class SeatsAeroProvider implements ISeatsAeroProvider {
  private api = axios.create({ baseURL: Config.seatsaero.url });

  async searchFlights(params: SeatsAeroSearchFlightDTO): Promise<SearchFlightsByMileageResponse> {
    return this.api.get('/partnerapi/search', { params, headers: { 'Content-Type': 'application/json', 'Partner-Authorization': `${Config.seatsaero.apiKey}` } })
      .then((res) => res.data)
      .catch((err) => { console.log(err); throw AppError.createAppError(Errors.AMADEUS_SEARCH_FAILED); });
  }

  async getTrips(id: string): Promise<GetTripByMileageResponse> {
    return this.api.get(`/partnerapi/trips/${id}`, { headers: { 'Content-Type': 'application/json', 'Partner-Authorization': `${Config.seatsaero.apiKey}` } })
      .then((res) => res.data)
      .catch((err) => { console.log(err); throw AppError.createAppError(Errors.AMADEUS_SEARCH_FAILED); });
  }
}

export default SeatsAeroProvider;
