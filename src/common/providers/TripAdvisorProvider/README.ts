/**
 * TripAdvisor Provider - Documentação e Exemplos
 *
 * Este provider permite buscar as principais atrações de uma cidade através do nome.
 * Suporta tanto a API oficial do TripAdvisor quanto métodos alternativos.
 *
 * Configuração necessária no .env:
 * TRIPADVISOR_API_KEY=sua_api_key_oficial (opcional)
 * TRIPADVISOR_BASE_URL=https://api.content.tripadvisor.com
 *
 * Uso programático:
 *
 * import { AppContainer } from '@src/common/container';
 * import ProviderTypes from '@common/providers/container/types';
 * import ITripAdvisorProvider from '@common/providers/TripAdvisorProvider/repositories/ITripAdvisorProvider';
 *
 * const tripAdvisorProvider = AppContainer.get<ITripAdvisorProvider>(ProviderTypes.TripAdvisorProvider);
 *
 * const attractions = await tripAdvisorProvider.searchAttractions({
 *   cityName: 'Salvador',
 *   limit: 10,
 *   category: 'attractions',
 *   sortBy: 'popularity'
 * });
 *
 * Exemplo de resposta:
 * {
 *   "cityName": "Salvador",
 *   "totalResults": 3,
 *   "attractions": [
 *     {
 *       "id": "mock-1",
 *       "name": "Atração Principal de Salvador",
 *       "description": "Uma das principais atrações turísticas de Salvador",
 *       "rating": 4.5,
 *       "reviewCount": 1250,
 *       "category": "attraction",
 *       "address": "Centro de Salvador",
 *       "priceRange": "$$",
 *       "tags": ["turismo", "cultura", "história"]
 *     }
 *   ],
 *   "searchTimestamp": "2025-07-29T12:00:00.000Z"
 * }
 *
 * Funcionalidades:
 * - Busca de atrações por nome da cidade
 * - Suporte à API oficial do TripAdvisor
 * - Fallback para método alternativo quando não há API key
 * - Informações detalhadas: rating, reviews, endereço, coordenadas, etc.
 * - Categorização e tags das atrações
 * - Ordenação por popularidade, rating ou distância
 */

export {};
