import webpush from 'web-push';
import { IPushNotificationProvider, PushNotificationPayload } from '../index';
import { AppContainer } from '@src/common/container';
import UserPushSubscriptionRepository from '@modules/user/infra/database/repositories/UserPushSubscriptionRepository';

// Configure suas chaves VAPID aqui
const VAPID_PUBLIC_KEY = process.env.VAPID_PUBLIC_KEY || '';
const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY || '';
const VAPID_SUBJECT = process.env.VAPID_SUBJECT || 'mailto:admin@econotrip.com';

webpush.setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);

export interface UserPushSubscription {
  userId: number;
  subscription: webpush.PushSubscription;
}

class WebPushNotificationProvider implements IPushNotificationProvider {
  private userPushSubscriptionRepository = AppContainer.resolve(UserPushSubscriptionRepository);

  async getUserSubscription(userId: number): Promise<webpush.PushSubscription | null> {
    const record = await this.userPushSubscriptionRepository.getByUserId(userId);
    if (!record) return null;
    // Subscription pode estar como string (JSON), garantir parse
    const subscription = typeof record.subscription === 'string'
      ? JSON.parse(record.subscription)
      : record.subscription;
    return subscription as webpush.PushSubscription;
  }

  async sendPushNotification(payload: PushNotificationPayload): Promise<void> {
    const subscription = await this.getUserSubscription(payload.userId);
    if (!subscription) {
      console.warn(`Usuário ${payload.userId} não possui subscription de push.`);
      return;
    }
    const notificationPayload = JSON.stringify({
      title: payload.title,
      message: payload.message,
      data: payload.data || {},
    });
    await webpush.sendNotification(subscription, notificationPayload);
  }
}

export default WebPushNotificationProvider;
