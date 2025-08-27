interface IListLocationByGoogleResponse {
  data: {
    info: {
      index: number;
      shortName: string;
      cityName: string;
      description?: string;
      geoId: string;
      priority: number;
      confidenceScore: number;
    };
    nearbyAirports: {
      airport: {
        index: number;
        name: string;
        cityName: string;
        geoId: string;
        code: string;
        displayCode: string;
        priority: number;
      };
      distance: string;
    }[];
  }[];
  status: boolean;
  message: string;
}

export default IListLocationByGoogleResponse;
