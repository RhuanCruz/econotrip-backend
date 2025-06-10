import { object, string } from 'zod';

const CreateRoleSchema = object({
  short: string().min(1).max(255),
  name: string().min(1).max(255),
  description: string().max(1024).nullable().optional(),
});

interface CreateRoleType {
  short: string;
  name: string;
  description?: string | null;
}

export { CreateRoleSchema, CreateRoleType };
