import IFilterSearchOneWayDTO from '../dtos/IFilterSearchOneWayDTO';
import IFilterSearchRoundTripDTO from '../dtos/IFilterSearchRoundTripDTO';
import IGetSearchDetailDTO from '../dtos/IGetSearchDetailDTO';
import IListLocation2Response from '../responses/IListLocation2Response';
import IListLocationByBookingResponse from '../responses/IListLocationByBookingResponse';
import IListLocationByGoogleResponse from '../responses/IListLocationByGoogleResponse';
import IListLocationResponse from '../responses/IListLocationResponse';
import ISearchDetailResponse from '../responses/ISearchDetailResponse';
import ISearchFlightResponse from '../responses/ISearchFlightResponse';

interface IFlightScraperSkyProvider {
  listLocations(key: string): Promise<IListLocationResponse>;
  listLocations2(key: string): Promise<IListLocation2Response>;
  listLocationsBooking(query: string): Promise<IListLocationByBookingResponse>;
  listLocationsByGoogle(query: string): Promise<IListLocationByGoogleResponse>;
  searchOneWay(filters: IFilterSearchOneWayDTO): Promise<ISearchFlightResponse>;
  searchORoundTrip(filters: IFilterSearchRoundTripDTO): Promise<ISearchFlightResponse>;
  getDetails(data: IGetSearchDetailDTO): Promise<ISearchDetailResponse>;
}

export default IFlightScraperSkyProvider;
