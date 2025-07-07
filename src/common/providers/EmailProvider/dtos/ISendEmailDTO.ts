import { Attachment } from 'nodemailer/lib/mailer';

interface ISendEmailDTO {
  to: string | string[];
  from?: string;
  subject: string;
  message?: string;
  attachments?: Attachment[];
  alternatives?: Attachment[];
  context?: object;
  template?: string;
}

export default ISendEmailDTO;
