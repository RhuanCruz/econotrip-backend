import { object, string } from 'zod';

const SearchFlightDetailSchema = object({
  token: string(),
  itineraryId: string(),
});

interface SearchFlightDetailType {
  token: string;
  itineraryId: string;
}

export { SearchFlightDetailSchema, SearchFlightDetailType };
