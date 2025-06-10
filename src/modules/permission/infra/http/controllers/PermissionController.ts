import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';

import { AppContainer } from '@src/common/container';
import { ParseZodError } from '@src/common/errors';

import { CreatePermissionService, CreatePermissionSchema } from '@src/modules/permission/useCases/CreatePermission';
import { UpdatePermissionService, UpdatePermissionSchema } from '@src/modules/permission/useCases/UpdatePermission';
import { ListPermissionService, ListPermissionSchema } from '@src/modules/permission/useCases/ListPermission';
import { DeletePermissionService } from '@src/modules/permission/useCases/DeletePermission';
import { GetPermissionService } from '@src/modules/permission/useCases/GetPermission';

class PermissionController {
  public async create(req: Request, res: Response): Promise<void> {
    const data = await CreatePermissionSchema.parseAsync(req.body).catch((err) => {
      throw ParseZodError(err);
    });

    const response = await AppContainer.resolve(CreatePermissionService).execute(data);
    res.status(StatusCodes.CREATED).json(response);
  }

  public async getById(req: Request, res: Response): Promise<void> {
    const { permissionId } = req.params;

    const response = await AppContainer.resolve(GetPermissionService).execute(Number(permissionId));
    res.status(StatusCodes.OK).json(response);
  }

  public async list(req: Request, res: Response): Promise<void> {
    const data = await ListPermissionSchema.parseAsync(req.body).catch((err) => {
      throw ParseZodError(err);
    });

    const response = await AppContainer.resolve(ListPermissionService).execute(data);
    res.status(StatusCodes.OK).json(response);
  }

  public async update(req: Request, res: Response): Promise<void> {
    const { permissionId } = req.params;

    const data = await UpdatePermissionSchema.parseAsync(req.body).catch((err) => {
      throw ParseZodError(err);
    });

    const response = await AppContainer.resolve(UpdatePermissionService).execute(Number(permissionId), data);
    res.status(StatusCodes.OK).json(response);
  }

  public async delete(req: Request, res: Response): Promise<void> {
    const { permissionId } = req.params;

    const response = await AppContainer.resolve(DeletePermissionService).execute(Number(permissionId));
    res.status(StatusCodes.OK).json(response);
  }
}

export default PermissionController;
