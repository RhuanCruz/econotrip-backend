interface IListRoleDTO {
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
    createdBegin?: Date;
    createdEnd?: Date;
  };
}

export default IListRoleDTO;
