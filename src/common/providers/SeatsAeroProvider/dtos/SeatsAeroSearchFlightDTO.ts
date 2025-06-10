type SeatsAeroSearchFlightDTO = {
  origin_airport: string;
  destination_airport: string;
  start_date?: string;
  end_date?: string;
  order_by?: string
};

export default SeatsAeroSearchFlightDTO;
