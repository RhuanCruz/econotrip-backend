import { Attachment } from 'nodemailer/lib/mailer';

interface ISendEmailCustomDTO {
  emailCredentials: {
    host: string,
    port: number;
    secure: boolean;
    name: string;
    from: string;
    auth: {
      user: string;
      pass: string;
    },
    authMethod: string;
    tls: {
      rejectUnauthorized: false,
      ciphers: 'HIGH:MEDIUM:!aNULL:!eNULL:@STRENGTH:!DH:!kEDH',
    },
  },
  to: string | string[];
  from?: string;
  subject: string;
  message: string;
  attachments?: Attachment[];
  alternatives?: Attachment[];
}

export default ISendEmailCustomDTO;
