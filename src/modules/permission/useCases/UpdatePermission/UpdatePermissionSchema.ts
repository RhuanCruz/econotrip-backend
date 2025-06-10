import { object, string } from 'zod';

const UpdatePermissionSchema = object({
  short: string().min(1).max(255).optional(),
  name: string().min(1).max(255).optional(),
  description: string().max(1024).nullable().optional(),
});

interface UpdatePermissionType {
  short?: string;
  name?: string;
  description?: string | null;
}

export { UpdatePermissionSchema, UpdatePermissionType };
