import { object, string } from 'zod';

const GeneratePlannerSchema = object({
  start: string().date().transform((date) => `${date}T00:00:00.000Z`),
  end: string().date().transform((date) => `${date}T00:00:00.000Z`),
  destination: string().max(32),
});

interface GeneratePlannerType {
  start: string;
  end: string;
  destination: string;
}

export { GeneratePlannerSchema, GeneratePlannerType };
