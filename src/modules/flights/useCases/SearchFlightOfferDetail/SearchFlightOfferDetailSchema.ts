import { object, string } from 'zod';

const SearchFlightOfferDetailSchema = object({
  origin: string(),
  destination: string(),
  departure: string(),
  return: string().optional(),
  bookingToken: string(),
});

interface SearchFlightOfferDetailType {
  origin: string;
  destination: string;
  departure: string;
  return?: string;
  bookingToken: string;
}

export { SearchFlightOfferDetailSchema, SearchFlightOfferDetailType };
