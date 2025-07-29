/**
 * Exemplo de uso do GeoNamesProvider
 *
 * Para usar este provider:
 *
 * 1. Configure as variáveis de ambiente:
 *    GEONAMES_URL=https://secure.geonames.org
 *    GEONAMES_USERNAME=seu_username_geonames
 *
 * 2. Endpoint disponível:
 *    GET /api/v1/location/cities/search?q=salvador
 *
 * 3. Exemplo de resposta:
 * {
 *   "totalResultsCount": 10,
 *   "geonames": [
 *     {
 *       "adminCode1": "05",
 *       "lng": "-38.51083",
 *       "geonameId": 3450554,
 *       "toponymName": "Salvador",
 *       "countryId": "3469034",
 *       "fcl": "P",
 *       "population": 2711840,
 *       "countryCode": "BR",
 *       "name": "Salvador",
 *       "fclName": "city, village,...",
 *       "adminCodes1": {
 *         "ISO3166_2": "BA"
 *       },
 *       "countryName": "Brasil",
 *       "fcodeName": "seat of a first-order administrative division",
 *       "adminName1": "Bahia",
 *       "lat": "-12.97111",
 *       "fcode": "PPLA"
 *     }
 *   ]
 * }
 *
 * 4. Uso programático:
 *
 * import { AppContainer } from '@src/common/container';
 * import LocationTypes from '@modules/location/container/types';
 * import SearchCitiesUseCase from '@modules/location/useCases/SearchCities/SearchCitiesUseCase';
 *
 * const searchCitiesUseCase = AppContainer.get<SearchCitiesUseCase>(LocationTypes.SearchCitiesUseCase);
 * const cities = await searchCitiesUseCase.execute('salvador');
 */

export {};
