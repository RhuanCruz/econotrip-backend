import { Body, OperationId, Post, Route, Security, Tags } from 'tsoa';
import { instanceToInstance } from 'class-transformer';
import { inject, injectable } from 'inversify';
import { sign, SignOptions } from 'jsonwebtoken';
import { verify } from 'argon2';

import { AppError, Errors } from '@src/common/errors';
import { Types } from '@src/common/container';
import { LoginType } from './LoginSchema';

import IPermissionRepository from '@repositories/IPermissionRepository';
import IUserRepository from '@repositories/IUserRepository';
import IRoleRepository from '@repositories/IRoleRepository';
import Config from '@src/config';
import LoginResponse from './LoginResponse';

@injectable()
@Route('auth')
@Tags('Auth')
class LoginService {
  @inject(Types.UserRepository) private userRepository: IUserRepository;

  @inject(Types.RoleRepository) private roleRepository: IRoleRepository;

  @inject(Types.PermissionRepository) private permissionRepository: IPermissionRepository;

  @Post('/')
  @Security('BearerAuth')
  @OperationId('login')
  public async execute(@Body() data: LoginType): Promise<LoginResponse> {
    const user = await this.userRepository.findByLogin(data.login) ?? await this.userRepository.findByEmail(data.login);
    if (!user) throw AppError.createAppError(Errors.LOGIN_FAILED);

    const userPassword = await this.userRepository.getPassword(user.id);
    if (!userPassword) throw AppError.createAppError(Errors.LOGIN_FAILED);

    if (!await verify(userPassword.passwordHash, data.password)) {
      throw AppError.createAppError(Errors.LOGIN_FAILED);
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

export { LoginService };
