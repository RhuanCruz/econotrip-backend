type FlightCheapestDateSearchResponse = {
  type: string;
  origin: string;
  destination: string;
  departureDate: string;
  returnDate: string;
  price: {
    total: number;
  };
  links: {
    flightDestinations: string;
    flightOffers: string;
  };
};

export default FlightCheapestDateSearchResponse;
