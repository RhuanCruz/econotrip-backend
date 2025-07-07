import ISendEmailDTO from '@common/providers/EmailProvider/dtos/ISendEmailDTO';
import ISendEmailCustomDTO from '@common/providers/EmailProvider/dtos/ISendEmailCustomDTO';

interface IEmailProvider {
  send(email: ISendEmailDTO): Promise<void>;
  sendCustom(data: ISendEmailCustomDTO): Promise<void>;
}

export default IEmailProvider;
