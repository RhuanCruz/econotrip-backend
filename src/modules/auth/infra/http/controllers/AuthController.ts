import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';

import { AppContainer } from '@common/container';
import { ParseZodError } from '@src/common/errors';

import { LoginService, LoginSchema } from '@modules/auth/useCases/Login';
import { SocialLoginService, SocialLoginSchema } from '@modules/auth/useCases/SocialLogin';

class AuthController {
  public async login(req: Request, res: Response): Promise<void> {
    const data = await LoginSchema.parseAsync(req.body).catch((err) => {
      throw ParseZodError(err);
    });

    const response = await AppContainer.resolve(LoginService).execute(data);
    res.status(StatusCodes.OK).json(response);
  }

  public async socialLogin(req: Request, res: Response): Promise<void> {
    const data = await SocialLoginSchema.parseAsync(req.body).catch((err) => {
      throw ParseZodError(err);
    });

    const response = await AppContainer.resolve(SocialLoginService).execute(data);
    res.status(StatusCodes.OK).json(response);
  }
}

export default AuthController;
