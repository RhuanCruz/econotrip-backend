import { number, object, string, enum as ENUM } from 'zod';

const CreateRadarSchema = object({
  start: string().date().transform((date) => `${date}T00:00:00.000Z`),
  end: string().date().transform((date) => `${date}T00:00:00.000Z`),
  origin: string().max(32),
  destination: string().max(32),
  value: number().min(1),
  type: ENUM(['MONEY', 'AIRMILES']),
});

interface CreateRadarType {
  start: string;
  end: string;
  origin: string;
  destination: string;
  value: number;
  type: 'MONEY' | 'AIRMILES';
}

export { CreateRadarSchema, CreateRadarType };
