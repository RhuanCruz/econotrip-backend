import { array, number, object, string } from 'zod';

const GeneratePlannerSchema = object({
  start: string().date().transform((date) => `${date}T00:00:00.000Z`),
  duration: number().int().min(1).max(20),
  amountPeople: number(),
  tripStyle: string(),
  origin: string(),
  destination: array(object({
    city: string(),
    duration: number().int().min(1).max(20),
  })),
});

interface GeneratePlannerType {
  start: string;
  duration: number;
  amountPeople?: number;
  tripStyle?: string;
  origin: string;
  destination: {
    city: string;
    duration: number;
  }[];
}

export { GeneratePlannerSchema, GeneratePlannerType };
