import { object, string } from 'zod';

const UpdateUserSchema = object({
  login: string().min(1).max(128).optional(),
  email: string().email().optional(),
  phone: string().min(1).max(16).optional(),
  cpf: string().min(11).max(11).nullable().optional(),
  avatar: string().min(1).max(1024).nullable().optional(),
  birthdate: string().date().transform((date) => `${date}T00:00:00.000Z`).optional(),
  gender: string().min(1).max(16).optional(),
  password: string().min(6).max(32).optional(),
  confirmPassword: string().min(6).max(32).optional(),
}).refine((data) => data.password === data.confirmPassword, { message: 'Password should be indetical' });

interface UpdateUserType {
  login?: string;
  email?: string;
  phone?: string;
  cpf?: string | null;
  avatar?: string | null;
  birthdate?: string;
  gender?: string;
  password?: string;
  confirmPassword?: string;
}

export { UpdateUserSchema, UpdateUserType };
