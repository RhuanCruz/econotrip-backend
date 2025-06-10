import { User } from '@prisma/client';

interface LoginResponse {
  accessToken: string;
  accessTokenExp: string;
  refreshToken: string;
  refreshTokenExp: string;
  user: User;
}

export default LoginResponse;
