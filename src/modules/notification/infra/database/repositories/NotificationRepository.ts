import { PrismaClient, Prisma, Notification, NotificationType } from '@prisma/client';
import INotificationRepository from '@repositories/INotificationRepository';

const prisma = new PrismaClient();

class NotificationRepository implements INotificationRepository {
  async findById(id: number): Promise<Notification | null> {
    return prisma.notification.findUnique({ where: { id } });
  }

  async findAllByUser(userId: number): Promise<Notification[]> {
    return prisma.notification.findMany({ where: { userId }, orderBy: { sentAt: 'desc' } });
  }

  async create(data: Prisma.NotificationCreateInput): Promise<Notification> {
    return prisma.notification.create({ data });
  }

  async update(id: number, data: Prisma.NotificationUpdateInput): Promise<Notification> {
    return prisma.notification.update({ where: { id }, data });
  }

  async delete(id: number): Promise<void> {
    await prisma.notification.delete({ where: { id } });
  }

  async listTypes(): Promise<NotificationType[]> {
    return prisma.notificationType.findMany();
  }

  async getTypeByName(name: string): Promise<NotificationType | null> {
    return prisma.notificationType.findUnique({ where: { name } });
  }

  async connectNotificationToRadar(notificationId: number, radarId: number): Promise<void> {
    await prisma.radarNotification.create({ data: { notificationId, radarId } });
  }
}

export default NotificationRepository;
