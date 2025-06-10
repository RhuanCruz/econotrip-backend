type GetRadarFlightsResponse = {
  origin: string;
  destination: string;
  records: Array<{
    date: string;
    price: number;
  }>;
};

export { GetRadarFlightsResponse };
