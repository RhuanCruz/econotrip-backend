import { number, object, string } from 'zod';

const GeneratePlannerSchema = object({
  start: string().date().transform((date) => `${date}T00:00:00.000Z`),
  duration: number().int().min(1).max(20),
  amountPeople: number(),
  tripStyle: string(),
  origin: string(),
  destination: string(),
});

interface GeneratePlannerType {
  start: string;
  duration: number;
  amountPeople?: number;
  tripStyle?: string;
  origin: string;
  destination: string;
}

export { GeneratePlannerSchema, GeneratePlannerType };
