import { Router } from 'express';
import AuthController from '@modules/auth/infra/http/controllers/AuthController';

const authController = new AuthController();
const authRoutes = Router();

authRoutes.post('/', authController.login);
authRoutes.post('/social', authController.socialLogin);

export default authRoutes;
