interface FlightDetail {
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

interface LayoversDetail {
  duration: number;
  name: string;
  id: string;
  overnight: boolean;
}

interface SearchFlightOfferDetailResponse {
  selected_flights: Array<{
    flights: Array<FlightDetail>;
    layovers: Array<LayoversDetail>;
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
  baggage_prices: {
    together: Array<string>;
    departing: Array<string>;
    returning: Array<string>;
  },
  booking_options: Array<{
    separate_tickets: boolean;
    together: {
      book_with: string;
      airline_logos: Array<string>;
      marketed_as: Array<string>;
      price: number;
      local_prices: {
        currency: string;
        price: number;
      }
      option_title: string;
      extensions: Array<string>;
      baggage_prices: Array<string>;
      booking_request: {
        url: string;
        post_data: string;
      },
      booking_phone: string;
      estimated_phone_service_fee: number;
    },
  }>,
  price_insights: {
    lowest_price: number;
    price_level: string;
    typical_price_range: Array<string>;
    price_history: Array<string>;
  },
}

export { SearchFlightOfferDetailResponse };
