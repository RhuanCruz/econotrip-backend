interface IListLocationByBookingResponse {
  data: {
    type: 'CITY' | 'AIRPORT';
    name: string;
    code: string;
    city?: string;
    cityName?: string;
    regionName: string;
    country: string;
    countryName: string;
    countryNameShort?: string;
    photoUri: string;
    distanceToCity?: {
      value: number;
      unit: string;
    };
    parent?: string;
  }[];
  status: boolean;
  message: string;
}

export default IListLocationByBookingResponse;
