import { PrismaClient } from '@prisma/client';
import Logger from '@src/common/logger';

import RolePermissionSeed from '@database/prisma/seeds/scripts/RolePermissionSeed';
import PermissionSeed from '@database/prisma/seeds/scripts/PermissionSeed';
import RoleSeed from '@database/prisma/seeds/scripts/RoleSeed';

const prisma = new PrismaClient();

const RunSeed = async () => {
  Logger.info('Running seeds');

  await RoleSeed(prisma);
  await PermissionSeed(prisma);
  await RolePermissionSeed(prisma);

  Logger.info('Finished seeds');
};

RunSeed();
