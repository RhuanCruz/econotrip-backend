import { injectable } from 'inversify';
import axios from 'axios';

import { Errors, AppError } from '@src/common/errors';
import Config from '@src/config';

import ITripAdvisorProvider from '@common/providers/TripAdvisorProvider/repositories/ITripAdvisorProvider';
import ISearchAttractionsDTO from '@common/providers/TripAdvisorProvider/dtos/ISearchAttractionsDTO';
import ISearchAttractionsResponse, { Attraction } from '@common/providers/TripAdvisorProvider/responses/ISearchAttractionsResponse';

@injectable()
class TripAdvisorProvider implements ITripAdvisorProvider {
  private api = axios.create({
    baseURL: Config.tripadvisor.baseUrl || 'https://api.content.tripadvisor.com',
    timeout: 10000,
  });

  public async searchAttractions(data: ISearchAttractionsDTO): Promise<ISearchAttractionsResponse> {
    try {
      // Se houver API key oficial, usar a API oficial
      if (Config.tripadvisor.apiKey) {
        return await this.searchWithOfficialAPI(data);
      }

      // Caso contrário, usar método alternativo (simulado por enquanto)
      return await this.searchWithAlternativeMethod(data);
    } catch (error) {
      console.error('Erro na busca de atrações TripAdvisor:', error);
      throw AppError.createAppError(Errors.TRIPADVISOR_SEARCH_FAILED);
    }
  }

  private async searchWithOfficialAPI(data: ISearchAttractionsDTO): Promise<ISearchAttractionsResponse> {
    try {
      // Implementação usando a API oficial do TripAdvisor
      // Nota: A API oficial tem endpoints específicos que requerem location_id primeiro

      // 1. Primeiro, buscar o location_id da cidade
      const locationResponse = await this.api.get('/api/v1/location/search', {
        params: {
          key: Config.tripadvisor.apiKey,
          searchQuery: data.cityName,
          category: 'geos',
        },
      });

      if (!locationResponse.data.data || locationResponse.data.data.length === 0) {
        throw new Error('Cidade não encontrada');
      }

      const locationId = locationResponse.data.data[0].location_id;

      // 2. Buscar atrações da cidade
      const attractionsResponse = await this.api.get(`/api/v1/location/${locationId}/attractions`, {
        params: {
          key: Config.tripadvisor.apiKey,
          limit: data.limit || 20,
          sort: data.sortBy || 'popularity',
        },
      });

      const attractions: Attraction[] = attractionsResponse.data.data.map((item: any) => ({
        id: item.location_id,
        name: item.name,
        description: item.description,
        rating: parseFloat(item.rating),
        reviewCount: parseInt(item.num_reviews, 10),
        category: item.category?.name || 'attraction',
        address: item.address_obj ? this.formatAddress(item.address_obj) : undefined,
        website: item.website,
        phone: item.phone,
        imageUrl: item.photo?.images?.large?.url,
        priceRange: item.price_level,
        coordinates: item.latitude && item.longitude ? {
          latitude: parseFloat(item.latitude),
          longitude: parseFloat(item.longitude),
        } : undefined,
        tags: item.subcategory?.map((sub: any) => sub.name) || [],
      }));

      return {
        cityName: data.cityName,
        totalResults: attractions.length,
        attractions,
        searchTimestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Erro na API oficial do TripAdvisor:', error);
      throw error;
    }
  }

  private async searchWithAlternativeMethod(data: ISearchAttractionsDTO): Promise<ISearchAttractionsResponse> {
    // Implementação alternativa (pode ser web scraping ou outra API)
    // Por enquanto, retornar dados mock para demonstração

    const mockAttractions: Attraction[] = [
      {
        id: 'mock-1',
        name: `Atração Principal de ${data.cityName}`,
        description: `Uma das principais atrações turísticas de ${data.cityName}`,
        rating: 4.5,
        reviewCount: 1250,
        category: 'attraction',
        address: `Centro de ${data.cityName}`,
        priceRange: '$$',
        tags: ['turismo', 'cultura', 'história'],
      },
      {
        id: 'mock-2',
        name: `Museu de ${data.cityName}`,
        description: `Museu histórico da cidade de ${data.cityName}`,
        rating: 4.2,
        reviewCount: 890,
        category: 'museum',
        address: `Área Histórica de ${data.cityName}`,
        priceRange: '$',
        tags: ['museu', 'história', 'cultura'],
      },
      {
        id: 'mock-3',
        name: `Parque Central de ${data.cityName}`,
        description: 'Principal parque da cidade para lazer e recreação',
        rating: 4.0,
        reviewCount: 567,
        category: 'park',
        address: `Centro de ${data.cityName}`,
        priceRange: 'Gratuito',
        tags: ['parque', 'natureza', 'família'],
      },
    ];

    // Simular delay de API
    await new Promise((resolve) => {
      setTimeout(resolve, 500);
    });

    return {
      cityName: data.cityName,
      totalResults: mockAttractions.length,
      attractions: mockAttractions.slice(0, data.limit || 20),
      searchTimestamp: new Date().toISOString(),
    };
  }

  private formatAddress(addressObj: any): string {
    const parts = [
      addressObj.street1,
      addressObj.street2,
      addressObj.city,
      addressObj.state,
      addressObj.country,
    ].filter(Boolean);

    return parts.join(', ');
  }
}

export default TripAdvisorProvider;
