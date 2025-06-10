import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';

import { AppContainer } from '@src/common/container';
import { ParseZodError } from '@src/common/errors';

import { CheckUserExistenceService, CheckUserExistenceSchema } from '@src/modules/user/useCases/CheckUserExistence';
import { CreateUserService, CreateUserSchema } from '@src/modules/user/useCases/CreateUser';
import { UpdateUserService, UpdateUserSchema } from '@src/modules/user/useCases/UpdateUser';
import { ListUserService, ListUserSchema } from '@src/modules/user/useCases/ListUser';
import { DeleteUserService } from '@src/modules/user/useCases/DeleteUser';
import { GetUserService } from '@src/modules/user/useCases/GetUser';

class UserController {
  public async create(req: Request, res: Response): Promise<void> {
    const data = await CreateUserSchema.parseAsync(req.body).catch((err) => {
      throw ParseZodError(err);
    });

    const response = await AppContainer.resolve(CreateUserService).execute(data);
    res.status(StatusCodes.CREATED).json(response);
  }

  public async getById(req: Request, res: Response): Promise<void> {
    const { userId } = req.params;

    const response = await AppContainer.resolve(GetUserService).execute(Number(userId));
    res.status(StatusCodes.OK).json(response);
  }

  public async list(req: Request, res: Response): Promise<void> {
    const data = await ListUserSchema.parseAsync(req.body).catch((err) => {
      throw ParseZodError(err);
    });

    const response = await AppContainer.resolve(ListUserService).execute(data);
    res.status(StatusCodes.OK).json(response);
  }

  public async update(req: Request, res: Response): Promise<void> {
    const { userId } = req.params;

    const data = await UpdateUserSchema.parseAsync(req.body).catch((err) => {
      throw ParseZodError(err);
    });

    const response = await AppContainer.resolve(UpdateUserService).execute(Number(userId), data);
    res.status(StatusCodes.OK).json(response);
  }

  public async delete(req: Request, res: Response): Promise<void> {
    const { userId } = req.params;

    const response = await AppContainer.resolve(DeleteUserService).execute(Number(userId));
    res.status(StatusCodes.OK).json(response);
  }

  public async checkExistence(req: Request, res: Response): Promise<void> {
    const data = await CheckUserExistenceSchema.parseAsync(req.body).catch((err) => {
      throw ParseZodError(err);
    });

    const response = await AppContainer.resolve(CheckUserExistenceService).execute(data);
    res.status(StatusCodes.OK).json(response);
  }
}

export default UserController;
