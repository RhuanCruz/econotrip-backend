import { object, string } from 'zod';

const SearchMileageProgramsSchema = object({
  origin: string(),
  destination: string(),
  departure: string(),
});

interface SearchMileageProgramsType {
  origin: string;
  destination: string;
  departure: string;
}

export { SearchMileageProgramsSchema, SearchMileageProgramsType };
