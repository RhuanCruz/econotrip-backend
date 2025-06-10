import ISearchFlightOffersDTO from '@common/providers/AmadeusProvider/dtos/ISearchFlightOffersDTO';
import FlightCheapestDateSearchType from '@common/providers/AmadeusProvider/dtos/FlightCheapestDateSearchType';

import ISearchFlightOffersResponse from '@common/providers/AmadeusProvider/responses/ISearchFlightOffersResponse';
import ILoginResponse from '@common/providers/AmadeusProvider/responses/ILoginResponse';
import FlightCheapestDateSearchResponse from '@common/providers/AmadeusProvider/responses/FlightCheapestDateSearchResponse';

interface IAmadeusProvider {
  login(): Promise<ILoginResponse>;
  searchFlightOffers(data: ISearchFlightOffersDTO): Promise<ISearchFlightOffersResponse>;
  flightCheapestDateSearch(data: FlightCheapestDateSearchType): Promise<FlightCheapestDateSearchResponse>;
}

export default IAmadeusProvider;
