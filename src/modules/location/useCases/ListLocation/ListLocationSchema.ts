import { object, string } from 'zod';

const ListLocationSchema = object({
  keyword: string().min(3).max(128),
});

interface ListLocationType {
  keyword: string;
}

export { ListLocationSchema, ListLocationType };
