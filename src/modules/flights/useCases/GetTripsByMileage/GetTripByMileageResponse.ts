export type GetTripByMileageResponse = {
  data: Array<{
    ID: string;
    RouteID: string;
    AvailabilityID: string;
    AvailabilitySegments: Array<{
      ID: string;
      RouteID: string;
      AvailabilityID: string;
      AvailabilityTripID: string;
      FlightNumber: string;
      Distance: number;
      FareClass: string;
      AircraftName: string;
      AircraftCode: string;
      OriginAirport: string;
      DestinationAirport: string;
      DepartsAt: string;
      ArrivesAt: string;
      CreatedAt: string;
      UpdatedAt: string;
      Source: string;
      Cabin: string;
      Order: number;
    }>;
    TotalDuration: number;
    Stops: number;
    Carriers: string;
    RemainingSeats: number;
    MileageCost: number;
    TotalTaxes: number;
    TaxesCurrency: string;
    TaxesCurrencySymbol: string;
    TotalSegmentDistance: number;
    OriginAirport: string;
    DestinationAirport: string;
    Aircraft: Array<string>;
    FlightNumbers: string;
    DepartsAt: string;
    Cabin: string;
    ArrivesAt: string;
    CreatedAt: string;
    UpdatedAt: string;
    Source: string;
  }>;
  origin_coordinates: {
    Lat: number;
    Lon: number;
  };
  destination_coordinates: {
    Lat: number;
    Lon: number;
  },
  booking_links: Array<{
    label: string;
    link: string;
    primary: boolean;
  }>
  carriers: {
    G3: string;
  }
}
