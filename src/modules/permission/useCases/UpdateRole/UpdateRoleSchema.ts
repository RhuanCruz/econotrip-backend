import { object, string } from 'zod';

const UpdateRoleSchema = object({
  short: string().min(1).max(255).optional(),
  name: string().min(1).max(255).optional(),
  description: string().max(1024).nullable().optional(),
});

interface UpdateRoleType {
  short?: string;
  name?: string;
  description?: string | null;
}

export { UpdateRoleSchema, UpdateRoleType };
