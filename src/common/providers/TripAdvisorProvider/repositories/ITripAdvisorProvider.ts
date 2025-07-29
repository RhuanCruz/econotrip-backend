import ISearchAttractionsDTO from '@common/providers/TripAdvisorProvider/dtos/ISearchAttractionsDTO';
import ISearchAttractionsResponse from '@common/providers/TripAdvisorProvider/responses/ISearchAttractionsResponse';

interface ITripAdvisorProvider {
  searchAttractions(data: ISearchAttractionsDTO): Promise<ISearchAttractionsResponse>;
}

export default ITripAdvisorProvider;
