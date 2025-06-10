interface ICreateUserDTO {
  login: string;
  phone?: string | null;
  email: string;
  fullname: string;
  cpf?: string | null;
  avatar?: string | null;
  birthdate: string;
  gender: string;
  admin?: boolean;
}

export default ICreateUserDTO;
