import { injectable } from 'inversify';
import axios from 'axios';

import { Errors, AppError } from '@src/common/errors';
import Config from '@src/config';

import IGooglePlacesProvider from '@common/providers/GooglePlacesProvider/repositories/IGooglePlacesProvider';
import ISearchTouristPlacesDTO from '@common/providers/GooglePlacesProvider/dtos/ISearchTouristPlacesDTO';
import ISearchTouristPlacesResponse from '@common/providers/GooglePlacesProvider/responses/ISearchTouristPlacesResponse';

@injectable()
class GooglePlacesProvider implements IGooglePlacesProvider {
  private api = axios.create({
    baseURL: Config.googlePlaces.baseUrl || 'https://maps.googleapis.com/maps/api/place',
    timeout: 10000,
  });

  public async searchTouristPlaces(data: ISearchTouristPlacesDTO): Promise<ISearchTouristPlacesResponse> {
    try {
      const query = `pontos turisticos em ${data.cityName}`;

      const params = {
        query,
        language: data.language || 'pt',
        key: Config.googlePlaces.apiKey,
        ...(data.pagetoken && { pagetoken: data.pagetoken }),
        ...(data.region && { region: data.region }),
        ...(data.type && { type: data.type }),
      };

      const response = await this.api.get('/textsearch/json', { params });

      // Verificar se a resposta da API do Google foi bem-sucedida
      if (response.data.status !== 'OK' && response.data.status !== 'ZERO_RESULTS') {
        console.error('Erro na API do Google Places:', response.data.status, response.data.error_message);
        throw new Error(`Google Places API Error: ${response.data.status}`);
      }

      return {
        results: response.data.results || [],
        status: response.data.status,
        next_page_token: response.data.next_page_token,
        html_attributions: response.data.html_attributions || [],
      };
    } catch (error) {
      console.error('Erro na busca de pontos turísticos Google Places:', error);
      throw AppError.createAppError(Errors.GOOGLE_PLACES_SEARCH_FAILED);
    }
  }
}

export default GooglePlacesProvider;
