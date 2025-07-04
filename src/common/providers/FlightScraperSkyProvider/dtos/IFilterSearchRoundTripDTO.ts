interface IFilterSearchRoundTripDTO {
  fromEntityId: string;
  toEntityId: string;
  departDate: string;
  returnDate: string;
  stops?: 'direct' | '1stop' | '2stop';
  adults?: number;
  children?: number;
  infants?: number;
  cabinClass?: 'economy' | 'premium_economy' | 'business' | 'first';
}

export default IFilterSearchRoundTripDTO;
