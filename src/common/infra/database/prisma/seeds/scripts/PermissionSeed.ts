import { PrismaClient } from '@prisma/client';
import Permissions from '../data/permissions.json';

const PermissionSeed = async (prisma: PrismaClient) => {
  await Promise.all(Permissions.map(async (permission) => {
    await prisma.permission.upsert({
      where: { short: permission.short },
      update: permission,
      create: permission,
    });
  }));
};

export default PermissionSeed;
