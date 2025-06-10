import { PrismaClient } from '@prisma/client';
import Roles from '../data/role.json';

const RoleSeed = async (prisma: PrismaClient) => {
  await Promise.all(Roles.map(async (role) => {
    await prisma.role.upsert({
      where: { short: role.short },
      update: role,
      create: role,
    });
  }));
};

export default RoleSeed;
