import { object, string } from 'zod';

const SocialLoginSchema = object({
  token: string(),
});

interface SocialLoginType {
  token: string;
}

export { SocialLoginSchema, SocialLoginType };
