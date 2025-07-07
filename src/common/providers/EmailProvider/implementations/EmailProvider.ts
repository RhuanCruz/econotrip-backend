import { injectable } from 'inversify';
import hbs from 'nodemailer-express-handlebars';
import nodemailer from 'nodemailer';

import AppError from '@common/errors/AppError';
import Config from '@src/config';

import IEmailProvider from '@common/providers/EmailProvider/repositories/IEmailProvider';
import ISendEmailDTO from '@common/providers/EmailProvider/dtos/ISendEmailDTO';
import ISendEmailCustomDTO from '@common/providers/EmailProvider/dtos/ISendEmailCustomDTO';
import { Errors } from '@src/common/errors';
import path from 'path';

@injectable()
class EmailProvider implements IEmailProvider {
  private transporter = nodemailer.createTransport(Config.email);

  constructor() {
    this.transporter.use('compile', hbs({
      viewEngine: {
        partialsDir: path.resolve('./src/templates/'),
        layoutsDir: path.resolve('./src/templates/'),
        defaultLayout: false,
      },
      viewPath: path.resolve('./src/templates/'), // Onde seus templates de e-mail estão
      extName: '.html',
    }));
  }

  public async send(data: ISendEmailDTO): Promise<void> {
    const {
      to, subject, attachments, alternatives, template, context,
    } = data;

    const from = data.from || Config.email.from || Config.email.auth.user;
    const mailOptions = {
      to, from, subject, attachments, alternatives, template, context,
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (err: any) {
      console.log(`ERROR SENDING EMAIL: ${err.message}`);
      throw AppError.createAppError(Errors.EMAIL_COULD_NOT_SEND);
    }
  }

  public async sendCustom(data: ISendEmailCustomDTO): Promise<void> {
    const {
      to, subject, attachments, alternatives } = data;
    let from = data.from || Config.email.from;
    const html = data.message;

    let customTransporter;
    if (data.emailCredentials) {
      customTransporter = nodemailer.createTransport(data.emailCredentials);
      from = data.emailCredentials.from ?? from;
    } else {
      customTransporter = this.transporter;
    }

    const mailOptions = {
      to, from, subject, html, attachments, alternatives,
    };

    try {
      await customTransporter.sendMail(mailOptions);
    } catch (err: any) {
      console.log(`ERROR SENDING EMAIL: ${err.message}`);
      throw AppError.createAppError(Errors.EMAIL_COULD_NOT_SEND);
    }
  }
}

export default EmailProvider;
