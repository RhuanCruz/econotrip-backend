import { number, object, string } from 'zod';

const ListFeedbackSchema = object({
  category: string().optional(),
  status: string().optional(),
  offset: number().min(0).optional(),
  limit: number().min(1).max(100).optional(),
});

interface ListFeedbackType {
  category?: string;
  status?: string;
  offset?: number;
  limit?: number;
}

export { ListFeedbackSchema, ListFeedbackType };
