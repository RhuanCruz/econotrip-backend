import { number, object, string, enum as ENUM } from 'zod';

const UpdateRadarSchema = object({
  start: string().date().transform((date) => `${date}T00:00:00.000Z`).optional(),
  end: string().date().transform((date) => `${date}T00:00:00.000Z`).optional(),
  origin: string().max(32).optional(),
  destination: string().max(32).optional(),
  value: number().min(1).optional(),
  type: ENUM(['MONEY', 'AIRMILES']).optional(),
  airline: string().max(64).optional(),
  tripType: ENUM(['ONE_WAY', 'ROUND_TRIP']).optional(),
  returnDateRange: number().min(1).max(30).optional(),
});

interface UpdateRadarType {
  start?: string;
  end?: string;
  origin?: string;
  destination?: string;
  value?: number;
  type?: 'MONEY' | 'AIRMILES';
  airline?: string;
  tripType?: 'ONE_WAY' | 'ROUND_TRIP';
  returnDateRange?: number;
}

export { UpdateRadarSchema, UpdateRadarType };
