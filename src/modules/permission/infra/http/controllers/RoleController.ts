import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';

import { AppContainer } from '@src/common/container';
import { ParseZodError } from '@src/common/errors';

import { UnlinkPermissionService, UnlinkPermissionSchema } from '@src/modules/permission/useCases/UnlinkPermission';
import { LinkPermissionService, LinkPermissionSchema } from '@src/modules/permission/useCases/LinkPermission';
import { CreateRoleService, CreateRoleSchema } from '@src/modules/permission/useCases/CreateRole';
import { UpdateRoleService, UpdateRoleSchema } from '@src/modules/permission/useCases/UpdateRole';
import { ListRoleService, ListRoleSchema } from '@src/modules/permission/useCases/ListRole';
import { DeleteRoleService } from '@src/modules/permission/useCases/DeleteRole';
import { GetRoleService } from '@src/modules/permission/useCases/GetRole';

class RoleController {
  public async create(req: Request, res: Response): Promise<void> {
    const data = await CreateRoleSchema.parseAsync(req.body).catch((err) => {
      throw ParseZodError(err);
    });

    const response = await AppContainer.resolve(CreateRoleService).execute(data);
    res.status(StatusCodes.CREATED).json(response);
  }

  public async getById(req: Request, res: Response): Promise<void> {
    const { roleId } = req.params;

    const response = await AppContainer.resolve(GetRoleService).execute(Number(roleId));
    res.status(StatusCodes.OK).json(response);
  }

  public async list(req: Request, res: Response): Promise<void> {
    const data = await ListRoleSchema.parseAsync(req.body).catch((err) => {
      throw ParseZodError(err);
    });

    const response = await AppContainer.resolve(ListRoleService).execute(data);
    res.status(StatusCodes.OK).json(response);
  }

  public async update(req: Request, res: Response): Promise<void> {
    const { roleId } = req.params;

    const data = await UpdateRoleSchema.parseAsync(req.body).catch((err) => {
      throw ParseZodError(err);
    });

    const response = await AppContainer.resolve(UpdateRoleService).execute(Number(roleId), data);
    res.status(StatusCodes.OK).json(response);
  }

  public async delete(req: Request, res: Response): Promise<void> {
    const { roleId } = req.params;

    const response = await AppContainer.resolve(DeleteRoleService).execute(Number(roleId));
    res.status(StatusCodes.OK).json(response);
  }

  public async addPermission(req: Request, res: Response): Promise<void> {
    const { roleId } = req.params;

    const data = await LinkPermissionSchema.parseAsync(req.body).catch((err) => {
      throw ParseZodError(err);
    });

    await AppContainer.resolve(LinkPermissionService).execute(Number(roleId), data);
    res.status(StatusCodes.NO_CONTENT).json({});
  }

  public async removePermission(req: Request, res: Response): Promise<void> {
    const { roleId } = req.params;

    const data = await UnlinkPermissionSchema.parseAsync(req.body).catch((err) => {
      throw ParseZodError(err);
    });

    await AppContainer.resolve(UnlinkPermissionService).execute(Number(roleId), data);
    res.status(StatusCodes.NO_CONTENT).json({});
  }
}

export default RoleController;
