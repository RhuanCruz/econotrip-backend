export interface PushNotificationPayload {
  userId: number;
  title: string;
  message: string;
  data?: Record<string, any>;
}

export interface IPushNotificationProvider {
  sendPushNotification(payload: PushNotificationPayload): Promise<void>;
}
