interface IListUserDTO {
  dataControl?: {
    limit?: number;
    offset?: number;
    paging?: boolean;
  };
  orderBy: {
    order: number;
    attribute: string;
    direction: 'ASC' | 'DESC';
  }[];
  filters?: {
    id?: number;
    name?: string;
    email?: string;
    cpf?: string;
    createdBegin?: Date;
    createdEnd?: Date;
  };
}

export default IListUserDTO;
