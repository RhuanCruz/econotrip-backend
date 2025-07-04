import { object, string } from 'zod';

const SearchFlightSchema = object({
  origin: string(),
  destination: string(),
  departure: string().date(),
  return: string().date().optional(),
});

interface SearchFlightType {
  origin: string;
  destination: string;
  departure: string;
  return?: string;
}

export { SearchFlightSchema, SearchFlightType };
