import { PrismaClient } from '@prisma/client';
import RolePermissions from '../data/rolePermission.json';
import Logger from '@src/common/logger';

const RolePermissionSeed = async (prisma: PrismaClient) => {
  await prisma.rolePermission.deleteMany();
  await Promise.all(RolePermissions.map(async (rolePermission) => {
    const role = await prisma.role.findFirst({ where: { short: rolePermission.role } });
    const permission = await prisma.permission.findFirst({ where: { short: rolePermission.permission } });

    if (!role) Logger.error(`[Seeds] Role ${rolePermission.role} NOT exist`);
    if (!permission) Logger.error(`[Seeds] Permission ${rolePermission.role} NOT exist`);
    if (!role || !permission) return;

    await prisma.rolePermission.create({
      data: {
        roleId: role.id,
        permissionId: permission.id,
      },
    });
  }));
};

export default RolePermissionSeed;
