interface IUpdateUserDTO {
  login?: string;
  email?: string;
  fullname?: string;
  phone?: string | null;
  cpf?: string | null;
  avatar?: string | null;
  birthdate?: string;
  gender?: string;
  admin?: boolean;
}

export default IUpdateUserDTO;
