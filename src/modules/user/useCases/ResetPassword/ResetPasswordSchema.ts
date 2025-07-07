import { object, string } from 'zod';

const ResetPasswordSchema = object({
  token: string(),
  password: string(),
  confirmPassword: string(),
}).refine((data) => data.password === data.confirmPassword, { message: 'Password should be indetical' });

interface ResetPasswordType {
  token: string;
  password: string;
  confirmPassword: string;
}

export { ResetPasswordSchema, ResetPasswordType };
