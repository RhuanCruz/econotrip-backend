import { number, object, string } from 'zod';

const GeneratePlannerSchema = object({
  start: string().date().transform((date) => `${date}T00:00:00.000Z`),
  end: string().date().transform((date) => `${date}T00:00:00.000Z`),
  amountPeople: number(),
  tripStyle: string(),
  origin: string().max(32),
  destination: string().max(32),
});

interface GeneratePlannerType {
  start: string;
  end: string;
  amountPeople?: number;
  tripStyle?: string;
  origin: string;
  destination: string;
}

export { GeneratePlannerSchema, GeneratePlannerType };
