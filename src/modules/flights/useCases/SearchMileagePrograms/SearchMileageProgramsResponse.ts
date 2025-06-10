export type SearchMileageProgramsResponse = Array<{
  id: string;
  originIata: string;
  destiantionIata: string;
  source: string;
  currency: string;
  economy: {
    price: number;
    taxes: number;
  };
  premium: {
    price: number;
    taxes: number;
  };
  business: {
    price: number;
    taxes: number;
  };
  first: {
    price: number;
    taxes: number;
  };
}>;
