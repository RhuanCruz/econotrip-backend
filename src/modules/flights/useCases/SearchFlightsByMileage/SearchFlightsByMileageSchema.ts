import { object, string } from 'zod';

const SearchFlightsByMileageSchema = object({
  origin: string(),
  destination: string(),
  departure: string(),
  return: string().optional(),
});

interface SearchFlightsByMileageType {
  origin: string;
  destination: string;
  departure: string;
  return?: string;
}

export { SearchFlightsByMileageSchema, SearchFlightsByMileageType };
