import { object, string } from 'zod';

const LoginSchema = object({
  login: string().min(1).max(255),
  password: string().min(6).max(32),
});

interface LoginType {
  login: string;
  password: string;
}

export { LoginSchema, LoginType };
