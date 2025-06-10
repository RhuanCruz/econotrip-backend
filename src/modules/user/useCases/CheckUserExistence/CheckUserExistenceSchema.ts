import { object, string } from 'zod';

const CheckUserExistenceSchema = object({
  email: string().email(),
});

interface CheckUserExistenceType {
  email: string;
}

export { CheckUserExistenceSchema, CheckUserExistenceType };
