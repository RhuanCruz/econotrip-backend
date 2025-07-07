import { Body, Post, Route, Tags, Security, OperationId } from 'tsoa';
import { inject, injectable } from 'inversify';

import { ForgotPasswordType } from './ForgotPasswordSchema';
import { Types } from '@src/common/container/';

import IUserRepository from '@repositories/IUserRepository';
import IEmailProvider from '@src/common/providers/EmailProvider/repositories/IEmailProvider';
import { sign } from 'jsonwebtoken';
import Config from '@src/config';

@injectable()
@Route('users')
@Tags('User')
class ForgotPasswordService {
  @inject(Types.UserRepository) private userRepository: IUserRepository;

  @inject(Types.EmailProvider) private emailProvider: IEmailProvider;

  @Post('/forgot-password')
  @Security('BearerAuth')
  @OperationId('forgot_password')
  public async execute(@Body() data: ForgotPasswordType): Promise<void> {
    const user = await this.userRepository.findByEmail(data.email);
    if (!user) return;

    const token = sign({ user: user.id }, Config.auth.accessTokenSecret, { expiresIn: '12h' });
    const forgotLink = `${Config.links.forgotPassword}?token=${token}`;

    console.log(forgotLink);

    await this.emailProvider.send({
      subject: 'Esqueceu sua senha?',
      to: user.email,
      template: 'ForgotPasswordTemplate',
      context: {
        username: user.fullname,
        organization: 'Econotrip',
        currentYear: new Date().getFullYear().toString(),
        link: forgotLink,
        linkExpiration: '12h',
      },
    });
  }
}

export { ForgotPasswordService };
