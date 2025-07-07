import { object, string } from 'zod';

const ForgotPasswordSchema = object({
  email: string().email(),
});

interface ForgotPasswordType {
  email: string;
}

export { ForgotPasswordSchema, ForgotPasswordType };
