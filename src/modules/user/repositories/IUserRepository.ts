import ICreateUserDTO from '@modules/user/dtos/ICreateUserDTO';
import IUpdateUserDTO from '@modules/user/dtos/IUpdateUserDTO';
// import IListOrgDTO from '@modules/user/dtos/IListUserDTO';
import { User, UserPassword } from '@prisma/client';

interface IUserRepository {
  create(data: ICreateUserDTO): Promise<User>;
  findById(id: number): Promise<User | null>;
  findByLogin(login: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  list(): Promise<User[]>;
  update(id: number, data: IUpdateUserDTO): Promise<void>;
  delete(id: number): Promise<void>;
  assignRole(userId: number, roleId: number): Promise<void>;
  removeRole(userId: number, roleId: number): Promise<void>;
  createPassword(userId: number, passwordHash: string): Promise<void>;
  getPassword(userId: number): Promise<UserPassword | null>;
  updatePassword(userId: number, passwordHash: string): Promise<void>;
}

export default IUserRepository;
