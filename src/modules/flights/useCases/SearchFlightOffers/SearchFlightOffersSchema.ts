import { object, string } from 'zod';

const SearchFlightOffersSchema = object({
  origin: string(),
  destination: string(),
  departure: string(),
  return: string().optional(),
  departureToken: string().optional(),
});

interface SearchFlightOffersType {
  origin: string;
  destination: string;
  departure: string;
  return?: string;
  departureToken?: string;
}

export { SearchFlightOffersSchema, SearchFlightOffersType };
