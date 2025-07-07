import { Body, Post, Route, Tags, Security, OperationId } from 'tsoa';
import { inject, injectable } from 'inversify';
import Argon2 from 'argon2';

import { ResetPasswordType } from './ResetPasswordSchema';
import { Types } from '@src/common/container/';

import IUserRepository from '@repositories/IUserRepository';
import { verify } from 'jsonwebtoken';
import Config from '@src/config';
import { AppError, Errors } from '@src/common/errors';

type IDecodedParams = { user: number; }

const DecodeToken = <T>(token: string, key: string): Promise<T> => new Promise((resolve, reject) => {
  verify(token, key, {}, (err, decoded) => {
    if (err) reject(err);
    resolve(decoded as T);
  });
});

@injectable()
@Route('users')
@Tags('User')
class ResetPasswordService {
  @inject(Types.UserRepository) private userRepository: IUserRepository;

  @Post('/reset-password')
  @Security('BearerAuth')
  @OperationId('reset_password')
  public async execute(@Body() data: ResetPasswordType): Promise<void> {
    const decoded = await DecodeToken<IDecodedParams>(data.token, Config.auth.accessTokenSecret).catch(() => {
      throw AppError.createAppError(Errors.AUTH_TYPE_NOT_SUPPORTED);
    });

    const user = await this.userRepository.findById(decoded.user);
    if (!user) throw AppError.createAppError(Errors.USER_NOT_FOUND);

    const passwordHash = await Argon2.hash(data.password);
    await this.userRepository.updatePassword(user.id, passwordHash);
  }
}

export { ResetPasswordService };
