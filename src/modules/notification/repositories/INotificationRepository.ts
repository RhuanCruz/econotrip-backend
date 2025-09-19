import { Prisma, Notification, NotificationType } from '@prisma/client';

interface INotificationRepository {
  findById(id: number): Promise<Notification | null>;
  findAllByUser(userId: number): Promise<Notification[]>;
  create(data: Prisma.NotificationCreateInput): Promise<Notification>;
  update(id: number, data: Prisma.NotificationUpdateInput): Promise<Notification>;
  delete(id: number): Promise<void>;
  listTypes(): Promise<NotificationType[]>;
  getTypeByName(name: string): Promise<NotificationType | null>;
  connectNotificationToRadar(notificationId: number, radarId: number): Promise<void>;
}

export default INotificationRepository;
