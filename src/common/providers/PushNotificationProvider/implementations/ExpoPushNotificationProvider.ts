import { IPushNotificationProvider, PushNotificationPayload } from '../index';

class ExpoPushNotificationProvider implements IPushNotificationProvider {
  async sendPushNotification(payload: PushNotificationPayload): Promise<void> {
    // TODO: Integrar com serviço real de push (ex: Expo, Firebase, etc)
    console.log(`Push enviado para usuário ${payload.userId}: ${payload.title} - ${payload.message}`);
  }
}

export default ExpoPushNotificationProvider;
