import { object, string, array } from 'zod';

const UpdatePlannerSchema = object({
  start: string().date().transform((date) => `${date}T00:00:00.000Z`).optional(),
  end: string().date().transform((date) => `${date}T00:00:00.000Z`).optional(),
  destination: array(string().max(255)).optional(),
  content: object({}).passthrough(),
});

interface UpdatePlannerType {
  start?: string;
  end?: string;
  destination?: string[];
  content?: any;
}

export { UpdatePlannerSchema, UpdatePlannerType };
