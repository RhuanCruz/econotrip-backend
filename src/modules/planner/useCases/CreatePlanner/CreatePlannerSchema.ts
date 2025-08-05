import { object, string, array } from 'zod';

const CreatePlannerSchema = object({
  start: string().date().transform((date) => `${date}T00:00:00.000Z`),
  end: string().date().transform((date) => `${date}T00:00:00.000Z`),
  destination: array(string().max(255)),
  content: object({}).passthrough(),
});

interface CreatePlannerType {
  start: string;
  end: string;
  destination: string[];
  content: any;
}

export { CreatePlannerSchema, CreatePlannerType };
