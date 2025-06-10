import 'reflect-metadata';
import 'dotenv/config';

import SwaggerUI from 'swagger-ui-express';
import Express from 'express';
import Http from 'http';
import Cors from 'cors';

import { CreateSuperAdminService } from '@src/modules/user/services/CreateSuperAdminService';
import { AppContainer } from '@src/common/container';

import ExceptionMiddleware from './middlewares/ExceptionMiddleware';
import SwaggerOptions from '@src/swagger/Options';
import Logger from '@common/logger';
import Config from '@src/config';
import AppRoutes from './routes';

class App {
  private readonly port = Config.api.port;

  private app: Express.Express;

  private server: Http.Server;

  constructor() {
    this.app = Express();
    this.server = Http.createServer(this.app);
    this.middlewares();
    this.routes();
    this.swagger();
    this.start();
  }

  private async createSuperAdmin() {
    await AppContainer.resolve(CreateSuperAdminService).execute(Config.admin)
      .then(() => {
        Logger.info('Super admin created or already created');
      })
      .catch((err) => {
        Logger.error('Failed to create super admin');
        Logger.error(err);
      });
  }

  private middlewares() {
    this.app.use(Cors());
    this.app.use(Express.json());
    this.app.use(Express.urlencoded({ extended: true }));
  }

  private routes() {
    this.app.use('/api/v1', AppRoutes);
    this.app.use(ExceptionMiddleware);
  }

  private swagger(): void {
    this.app.use('/api/v1/docs', SwaggerUI.serve, SwaggerUI.setup(SwaggerOptions, {
      swaggerOptions: {},
      customSiteTitle: 'Econotrip API',
    }));
  }

  private start() {
    this.server.listen(this.port, () => {
      Logger.info(`API Running on port ${this.port}`);
      this.createSuperAdmin();
    });
  }
}

export default new App();
