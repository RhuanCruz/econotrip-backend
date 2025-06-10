interface ISearchFlightOffersDTO {
  currencyCode: 'BRL' | 'USD',
  originDestinations: Array<{
    id: number;
    originLocationCode: string;
    destinationLocationCode: string;
    departureDateTimeRange: {
        date: string;
        time: string;
    };
  }>;
  travelers: Array<{
    id: number;
    travelerType: 'ADULT' | 'CHILD';
    fareOptions: Array<string>;
  }>
  sources: Array<'GDS'>;
}

export default ISearchFlightOffersDTO;
