import { injectable } from 'inversify';
// import { UserOrderBy } from '@src/utils/OrderByAttributeUtils';
// import { UserListOrderBy } from '@utils/RepositoryUtils';

import { PrismaClient, User, UserPassword, UserRole } from '@prisma/client';

import IUserRepository from '@modules/user/repositories/IUserRepository';
import ICreateUserDTO from '@src/modules/user/dtos/ICreateUserDTO';
import IUpdateUserDTO from '@src/modules/user/dtos/IUpdateUserDTO';
// import IListUserDTO from '@src/modules/user/dtos/IListUserDTO';

@injectable()
class UserRepository implements IUserRepository {
  private prisma = new PrismaClient();

  public async create(data: ICreateUserDTO): Promise<User> {
    return this.prisma.user.create({ data });
  }

  public async findById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  public async findByLogin(login: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { login } });
  }

  public async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  public async list(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  public async update(id: number, data: IUpdateUserDTO): Promise<void> {
    await this.prisma.user.update({ where: { id }, data });
  }

  public async delete(id: number): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }

  public async assignRole(userId: number, roleId: number): Promise<void> {
    await this.prisma.userRole.create({ data: { userId, roleId } });
  }

  public async getRole(userId: number, roleId: number): Promise<UserRole | null> {
    return this.prisma.userRole.findUnique({ where: { userId_roleId: { userId, roleId } } });
  }

  public async removeRole(userId: number, roleId: number): Promise<void> {
    await this.prisma.userRole.delete({ where: { userId_roleId: { userId, roleId } } });
  }

  public async createPassword(userId: number, passwordHash: string): Promise<void> {
    await this.prisma.userPassword.create({ data: { userId, passwordHash, current: true } });
  }

  public async getPassword(userId: number): Promise<UserPassword | null> {
    return this.prisma.userPassword.findFirst({ where: { userId, current: true } });
  }

  public async updatePassword(userId: number, passwordHash: string): Promise<void> {
    const userPassword = await this.prisma.userPassword.findFirst({ where: { userId, current: true } });
    if (!userPassword) throw new Error('Could not find password to this user');

    await this.prisma.userPassword.update({ where: { id: userPassword.id }, data: { passwordHash } });
  }

  public async getCurrenctPassword(userId: number): Promise<UserPassword | null> {
    return this.prisma.userPassword.findFirst({ where: { userId, current: true } });
  }
}

export default UserRepository;
