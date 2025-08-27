export interface StandardLocation {
  type: string;
  name: string;
  code: string;
  city: string;
  country?: string;
  region?: string;
  geoId?: string;
  source: string;
}

export interface StandardLocationResponse {
  locations: StandardLocation[];
  status: boolean;
  message?: string;
}

export function mapListLocationResponse(response: any, source: string): StandardLocationResponse {
  const locations = (() => {
    if (!response || !response.data) return [];
    // IListLocationResponse
    if (source === 'sky') {
      return response.data.map((loc: any) => ({
        type: loc.PlaceType || 'UNKNOWN',
        name: loc.PlaceName,
        code: loc.IataCode,
        city: loc.CityName,
        country: loc.CountryName,
        region: loc.RegionId,
        geoId: loc.PlaceId,
        source,
      }));
    }
    // IListLocation2Response
    if (source === 'sky2') {
      return response.data.map((loc: any) => ({
        type: loc.PlaceId ? 'AIRPORT' : 'UNKNOWN',
        name: loc.PlaceName,
        code: loc.IataCode,
        city: loc.CityName,
        country: loc.CountryName,
        region: loc.RegionId,
        geoId: loc.PlaceId,
        source,
      }));
    }
    // IListLocationByBookingResponse
    if (source === 'booking') {
      return response.data.map((loc: any) => ({
        type: loc.type,
        name: loc.name,
        code: loc.code,
        city: loc.city || loc.cityName,
        country: loc.country || loc.countryName,
        region: loc.regionName,
        geoId: loc.code,
        source,
      }));
    }
    // IListLocationByGoogleResponse
    if (source === 'google') {
      // Retorna apenas os que têm code no info, e type sempre AIRPORT
      return response.data
        .filter((loc: any) => loc.info && loc.info.code)
        .map((loc: any) => ({
          type: 'AIRPORT',
          name: loc.info.shortName,
          code: loc.info.code,
          city: loc.info.cityName,
          country: undefined,
          region: undefined,
          geoId: loc.info.geoId,
          source,
        }));
    }
    return [];
  })();
  return {
    locations,
    status: response?.status ?? true,
    message: response?.message,
  };
}
