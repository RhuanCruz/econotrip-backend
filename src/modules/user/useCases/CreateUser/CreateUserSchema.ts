import { array, object, string, enum as ENUM } from 'zod';

const CreateUserSchema = object({
  login: string().min(1).max(128).optional(),
  email: string().email(),
  fullname: string().min(1).max(128),
  phone: string().min(1).max(16).nullable().optional(),
  cpf: string().min(11).max(11).nullable().optional(),
  avatar: string().min(1).max(1024).nullable().optional(),
  birthdate: string().date().transform((date) => `${date}T00:00:00.000Z`),
  gender: ENUM(['MALE', 'FEMALE', 'OTHER']).default('OTHER'),
  password: string().min(6).max(32),
  roles: array(string()).optional(),
});

interface CreateUserType {
  login?: string;
  email: string;
  fullname: string;
  phone?: string | null;
  cpf?: string | null;
  avatar?: string | null;
  birthdate: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  password: string;
  roles?: Array<string>;
}

export { CreateUserSchema, CreateUserType };
