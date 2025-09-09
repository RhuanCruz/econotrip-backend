import { ISendMessageDTO } from '../dtos/ISendMessageDTO';

export interface IMessageRepository {
  sendSMS(data: ISendMessageDTO): Promise<void>;
  sendWhatsApp(data: ISendMessageDTO): Promise<void>;
}
