import { Body, OperationId, Post, Route, Security, Tags } from 'tsoa';
import { instanceToInstance } from 'class-transformer';
import { inject, injectable } from 'inversify';
import { sign, SignOptions } from 'jsonwebtoken';
import { auth } from '@config/firebase';

import { AppError, Errors } from '@src/common/errors';
import { Types } from '@src/common/container';
import { SocialLoginType } from './SocialLoginSchema';

import IPermissionRepository from '@repositories/IPermissionRepository';
import IUserRepository from '@repositories/IUserRepository';
import IRoleRepository from '@repositories/IRoleRepository';
import Config from '@src/config';
import SocialLoginResponse from './SocialLoginResponse';

@injectable()
@Route('auth')
@Tags('Auth')
class SocialLoginService {
  @inject(Types.UserRepository) private userRepository: IUserRepository;

  @inject(Types.RoleRepository) private roleRepository: IRoleRepository;

  @inject(Types.PermissionRepository) private permissionRepository: IPermissionRepository;

  @Post('/social')
  @Security('BearerAuth')
  @OperationId('social_login')
  public async execute(@Body() data: SocialLoginType): Promise<SocialLoginResponse> {
    const decodedToken = await auth.verifyIdToken(data.token).catch(() => {
      throw AppError.createAppError(Errors.AUTH_TOKEN_INCORRECT);
    });

    const userRecord = await auth.getUser(decodedToken.uid);
    if (!userRecord.email) throw AppError.createAppError(Errors.USER_LOGIN_CONFLICT);

    let user = await this.userRepository.findByEmail(userRecord.email);
    if (!user) {
      user = await this.userRepository.create({
        login: userRecord.email,
        email: userRecord.email,
        fullname: userRecord.displayName ?? 'Nome não definido',
        phone: userRecord.phoneNumber,
        avatar: userRecord.photoURL,
      });
    }

    const roles = await this.roleRepository.getUserRoles(user.id);
    const rolesToACL = roles.map((role) => role.short);

    const permissions = await this.permissionRepository.getUserPermissions(user.id);
    const permissionsToACL = permissions.map((perm) => perm.short);

    const accessToken = sign({ userId: user.id, admin: user.admin, permissions: permissionsToACL, role: rolesToACL }, Config.auth.accessTokenSecret, { expiresIn: Config.auth.accessTokenExp } as SignOptions);
    const refreshToken = sign({ userId: user.id }, Config.auth.refreshTokenSecret, { expiresIn: Config.auth.refreshTokenExp } as SignOptions);

    return {
      accessToken,
      accessTokenExp: Config.auth.accessTokenExp,
      refreshToken,
      refreshTokenExp: Config.auth.refreshTokenExp,
      user: instanceToInstance(user),
    };
  }
}

export { SocialLoginService };
