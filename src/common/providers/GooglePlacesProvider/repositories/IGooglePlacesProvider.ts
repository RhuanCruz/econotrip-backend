import ISearchTouristPlacesDTO from '@common/providers/GooglePlacesProvider/dtos/ISearchTouristPlacesDTO';
import ISearchTouristPlacesResponse from '@common/providers/GooglePlacesProvider/responses/ISearchTouristPlacesResponse';

interface IGooglePlacesProvider {
  searchTouristPlaces(data: ISearchTouristPlacesDTO): Promise<ISearchTouristPlacesResponse>;
}

export default IGooglePlacesProvider;
