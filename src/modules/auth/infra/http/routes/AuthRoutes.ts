import { Router } from 'express';
import AuthController from '@modules/auth/infra/http/controllers/AuthController';

const authController = new AuthController();
const authRoutes = Router();

authRoutes.post('/', authController.login);

export default authRoutes;
