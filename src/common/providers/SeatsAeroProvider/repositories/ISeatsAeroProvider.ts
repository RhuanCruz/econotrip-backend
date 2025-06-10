import SeatsAeroSearchFlightDTO from '../dtos/SeatsAeroSearchFlightDTO';
import { GetTripByMileageResponse } from '../responses/GetTripsByMileageResponse';
import SearchFlightsByMileageResponse from '../responses/SearchFlightsByMileageResponse';

interface ISeatsAeroProvider {
  searchFlights(params: SeatsAeroSearchFlightDTO): Promise<SearchFlightsByMileageResponse>;
  getTrips(id: string): Promise<GetTripByMileageResponse>;
}

export default ISeatsAeroProvider;
