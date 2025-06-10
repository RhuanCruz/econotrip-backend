import { array, object, number } from 'zod';

const LinkPermissionSchema = object({
  permissions: array(number().int()),
});

interface LinkPermissionType {
  permissions: Array<number>;
}

export { LinkPermissionSchema, LinkPermissionType };
