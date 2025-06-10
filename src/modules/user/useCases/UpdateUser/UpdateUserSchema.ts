import { object, string } from 'zod';

const UpdateUserSchema = object({
  login: string().min(1).max(128).optional(),
  email: string().email().optional(),
  phone: string().min(1).max(16).optional(),
  cpf: string().min(11).max(11).nullable().optional(),
  avatar: string().min(1).max(1024).nullable().optional(),
  birthdate: string().date().optional(),
  gender: string().min(1).max(16).optional(),
  password: string().min(6).max(32).optional(),
});

interface UpdateUserType {
  login?: string;
  email?: string;
  phone?: string;
  cpf?: string | null;
  avatar?: string | null;
  birthdate?: string;
  gender?: string;
  password?: string;
}

export { UpdateUserSchema, UpdateUserType };
