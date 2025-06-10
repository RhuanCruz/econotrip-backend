import { object, string } from 'zod';

const UpdateRadarSchema = object({
  start: string().date().transform((date) => `${date}T00:00:00.000Z`).optional(),
  end: string().date().transform((date) => `${date}T00:00:00.000Z`).optional(),
  origin: string().max(32).optional(),
  destination: string().max(32).optional(),
});

interface UpdateRadarType {
  start?: string;
  end?: string;
  origin?: string;
  destination?: string;
}

export { UpdateRadarSchema, UpdateRadarType };
