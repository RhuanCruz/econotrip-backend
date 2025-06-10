type FlightCheapestDateSearchType = {
  origin: string;
  destination: string;
  oneWay?: boolean;
  departureDate?: string;
  nonStop?: boolean;
  viewBy?: 'DATE' | 'WEEK';
  duration?: string;
};

export default FlightCheapestDateSearchType;
