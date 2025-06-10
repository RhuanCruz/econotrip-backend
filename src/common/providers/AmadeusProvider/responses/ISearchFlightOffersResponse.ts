interface Flight {
  departure_airport: {
    name: string;
    id: string;
    time: string;
  },
  arrival_airport: {
    name: string;
    id: string;
    time: string;
  },
  duration: number;
  airplane: string;
  airline: string;
  airline_logo: string;
  travel_class: string;
  flight_number: string;
  extensions: Array<string>;
  ticket_also_sold_by: Array<string>;
  legroom: string;
  overnight: boolean;
  often_delayed_by_over_30_min: boolean;
  plane_and_crew_by: string;
}

interface Layovers {
  duration: number;
  name: string;
  id: string;
  overnight: boolean;
}

interface ISearchFlightOffersResponse {
  best_flights: Array<{
    flights: Array<Flight>;
    layovers: Array<Layovers>;
    total_duration: number;
    carbon_emissions: {
      this_flight: number;
      typical_for_this_route: number;
      difference_percent: number;
    },
    price: number;
    type: string;
    airline_logo: string;
    extensions: Array<string>;
    departure_token: string;
    booking_token: string;
  }>;
  other_flights: Array<{
    flights: Array<Flight>;
    layovers: Array<Layovers>;
    total_duration: number;
    carbon_emissions: {
      this_flight: number;
      typical_for_this_route: number;
      difference_percent: number;
    },
    price: number;
    type: string;
    airline_logo: string;
    extensions: Array<string>;
    departure_token: string;
    booking_token: string;
  }>
}

export default ISearchFlightOffersResponse;
