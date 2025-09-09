import twilio from 'twilio';
import { IMessageRepository } from '../repositories/IMessageRepository';
import { ISendMessageDTO } from '../dtos/ISendMessageDTO';
import Config from '@src/config';

class TwilioMessageProvider implements IMessageRepository {
  private client = twilio(Config.twilio.accountSid, Config.twilio.authToken);

  async sendSMS(payload: ISendMessageDTO): Promise<void> {
    await this.client.messages.create({
      body: payload.message,
      from: Config.twilio.smsFrom,
      to: payload.to,
    });
  }

  async sendWhatsApp(payload: ISendMessageDTO): Promise<void> {
    await this.client.messages.create({
      body: payload.message,
      from: `whatsapp:${Config.twilio.whatsappFrom}`,
      to: `whatsapp:${payload.to}`,
    });
  }
}

export default TwilioMessageProvider;
