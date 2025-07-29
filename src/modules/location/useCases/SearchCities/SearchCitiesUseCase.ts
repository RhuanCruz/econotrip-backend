import { inject, injectable } from 'inversify';
import IGeoNamesProvider from '@common/providers/GeoNamesProvider/repositories/IGeoNamesProvider';
import ISearchCitiesDTO from '@common/providers/GeoNamesProvider/dtos/ISearchCitiesDTO';
import ISearchCitiesResponse from '@common/providers/GeoNamesProvider/responses/ISearchCitiesResponse';
import ProviderTypes from '@common/providers/container/types';
import { Get, OperationId, Query, Route, Security, Tags } from 'tsoa';
import Config from '@src/config';

@injectable()
@Route('locations')
@Tags('Location')
class SearchCitiesUseCase {
  constructor(
    @inject(ProviderTypes.GeoNamesProvider)
    private geoNamesProvider: IGeoNamesProvider,
  ) {}

  @Get('/cities/search')
  @Security('BearerAuth')
  @OperationId('search_cities')
  public async execute(@Query() cityName: string): Promise<ISearchCitiesResponse> {
    const searchParams: ISearchCitiesDTO = {
      name_startsWith: cityName,
      lang: 'pt',
      maxRows: 10,
      username: Config.geonames.username,
      featureClass: 'P',
      featureCode: ['PPL', 'PPLA', 'PPLA2', 'PPLA3', 'PPLC'],
    };

    return this.geoNamesProvider.searchCities(searchParams);
  }
}

export default SearchCitiesUseCase;
