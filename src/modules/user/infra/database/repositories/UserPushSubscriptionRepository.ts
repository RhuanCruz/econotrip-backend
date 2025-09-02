import { PrismaClient, UserPushSubscription } from '@prisma/client';

class UserPushSubscriptionRepository {
  private prisma = new PrismaClient();

  async createOrUpdate(userId: number, subscription: any): Promise<UserPushSubscription> {
    return this.prisma.userPushSubscription.upsert({
      where: { userId },
      update: { subscription: JSON.stringify(subscription) },
      create: { userId, subscription: JSON.stringify(subscription) },
    });
  }

  async getByUserId(userId: number): Promise<UserPushSubscription | null> {
    return this.prisma.userPushSubscription.findUnique({ where: { userId } });
  }
}

export default UserPushSubscriptionRepository;
