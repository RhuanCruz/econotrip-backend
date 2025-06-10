import { array, object, number } from 'zod';

const UnlinkPermissionSchema = object({
  permissions: array(number().int()),
});

interface UnlinkPermissionType {
  permissions: Array<number>;
}

export { UnlinkPermissionSchema, UnlinkPermissionType };
