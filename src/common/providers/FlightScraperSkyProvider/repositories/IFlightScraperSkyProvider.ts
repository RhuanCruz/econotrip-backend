import IListLocationResponse from '../responses/IListLocationResponse';

interface IFlightScraperSkyProvider {
  listLocations(key: string): Promise<IListLocationResponse>;
}

export default IFlightScraperSkyProvider;
