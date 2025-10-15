import { number, object, string, array, enum as ENUM } from 'zod';

const CreateFeedbackSchema = object({
  category: ENUM(['BUG', 'FEATURE_REQUEST', 'IMPROVEMENT', 'GENERAL', 'COMPLIMENT', 'COMPLAINT', 'OTHER']),
  subject: string().min(3).max(200),
  message: string().min(5).max(5000),
  rating: number().min(1).max(5).optional(),
  email: string().email().optional().nullable(),
  attachments: array(string()).optional(),
});

interface CreateFeedbackType {
  category: 'BUG' | 'FEATURE_REQUEST' | 'IMPROVEMENT' | 'GENERAL' | 'COMPLIMENT' | 'COMPLAINT' | 'OTHER';
  subject: string;
  message: string;
  rating?: number;
  email?: string | null;
  attachments?: string[];
}

export { CreateFeedbackSchema, CreateFeedbackType };
