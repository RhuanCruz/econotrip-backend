interface IFilterSearchOneWayDTO {
  fromEntityId: string;
  toEntityId: string;
  departDate: string;
  stops?: 'direct' | '1stop' | '2stop';
  adults?: number;
  children?: number;
  infants?: number;
  cabinClass?: 'economy' | 'premium_economy' | 'business' | 'first';
}

export default IFilterSearchOneWayDTO;
