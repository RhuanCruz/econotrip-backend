import { User } from '@prisma/client';

interface SocialLoginResponse {
  accessToken: string;
  accessTokenExp: string;
  refreshToken: string;
  refreshTokenExp: string;
  user: User;
}

export default SocialLoginResponse;
