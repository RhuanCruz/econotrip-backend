import IFilterSearchOneWayDTO from '../dtos/IFilterSearchOneWayDTO';
import IFilterSearchRoundTripDTO from '../dtos/IFilterSearchRoundTripDTO';
import IGetSearchDetailDTO from '../dtos/IGetSearchDetailDTO';
import IListLocationResponse from '../responses/IListLocationResponse';
import ISearchDetailResponse from '../responses/ISearchDetailResponse';
import ISearchFlightResponse from '../responses/ISearchFlightResponse';

interface IFlightScraperSkyProvider {
  listLocations(key: string): Promise<IListLocationResponse>;
  searchOneWay(filters: IFilterSearchOneWayDTO): Promise<ISearchFlightResponse>;
  searchORoundTrip(filters: IFilterSearchRoundTripDTO): Promise<ISearchFlightResponse>;
  getDetails(data: IGetSearchDetailDTO): Promise<ISearchDetailResponse>;
}

export default IFlightScraperSkyProvider;
