import ISearchCitiesDTO from '@common/providers/GeoNamesProvider/dtos/ISearchCitiesDTO';
import ISearchCitiesResponse from '@common/providers/GeoNamesProvider/responses/ISearchCitiesResponse';

interface IGeoNamesProvider {
  searchCities(data: ISearchCitiesDTO): Promise<ISearchCitiesResponse>;
}

export default IGeoNamesProvider;
