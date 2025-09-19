import { PrismaClient } from '@prisma/client';

const types = [
  { name: 'RADAR_PRICE', description: 'Notificação de nova oferta encontrada pelo radar' },
  { name: 'PASSWORD_RESET', description: 'Notificação de recuperação de senha' },
  { name: 'PLANNER_REMINDER', description: 'Lembrete de planejamento de viagem' },
  { name: 'GENERIC', description: 'Notificação genérica' },
];

const NotificationSeed = async (prisma: PrismaClient) => {
  await Promise.all(
    types.map((type) => prisma.notificationType.upsert({
      where: { name: type.name },
      update: type,
      create: type,
    })),
  );
};

export default NotificationSeed;
