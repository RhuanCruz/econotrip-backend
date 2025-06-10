interface IInitialSearchDTO {
  market: string;
  locale: string;
  currency: string;
  queryLegs: string;
  adults: number;
  childrenAges?: number;
  nearbyAirports?: boolean;
  cabinClass?: string;
}

export default IInitialSearchDTO;
