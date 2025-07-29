import { injectable } from 'inversify';
import axios from 'axios';

import { Errors, AppError } from '@src/common/errors';
import Config from '@src/config';

import IGeoNamesProvider from '@common/providers/GeoNamesProvider/repositories/IGeoNamesProvider';
import ISearchCitiesDTO from '@common/providers/GeoNamesProvider/dtos/ISearchCitiesDTO';
import ISearchCitiesResponse from '@common/providers/GeoNamesProvider/responses/ISearchCitiesResponse';

@injectable()
class GeoNamesProvider implements IGeoNamesProvider {
  private api = axios.create({ baseURL: Config.geonames.url });

  public async searchCities(data: ISearchCitiesDTO): Promise<ISearchCitiesResponse> {
    const params = {
      name_startsWith: data.name_startsWith,
      lang: data.lang || 'pt',
      maxRows: data.maxRows || 10,
      username: data.username || Config.geonames.username,
      featureClass: data.featureClass || 'P',
      featureCode: data.featureCode || ['PPL', 'PPLA', 'PPLA2', 'PPLA3', 'PPLC'],
    };

    try {
      const response = await this.api.get('/searchJSON', { params });
      return response.data;
    } catch (error) {
      console.error('Erro na busca de cidades GeoNames:', error);
      throw AppError.createAppError(Errors.GEONAMES_SEARCH_FAILED);
    }
  }
}

export default GeoNamesProvider;
