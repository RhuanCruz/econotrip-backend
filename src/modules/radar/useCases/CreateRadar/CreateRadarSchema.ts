import { object, string } from 'zod';

const CreateRadarSchema = object({
  start: string().date().transform((date) => `${date}T00:00:00.000Z`),
  end: string().date().transform((date) => `${date}T00:00:00.000Z`),
  origin: string().max(32),
  destination: string().max(32),
});

interface CreateRadarType {
  start: string;
  end: string;
  origin: string;
  destination: string;
}

export { CreateRadarSchema, CreateRadarType };
