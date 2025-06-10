import { instanceToInstance } from 'class-transformer';

interface PaginationResponse<T> {
  records: T[];
  metadata: {
    offset: number;
    items: number;
    total: number;
  };
}

const BuildPagination = <T>(records: T[], offset: number, total: number): PaginationResponse<T> => ({
  records: instanceToInstance(records),
  metadata: {
    offset,
    items: records.length,
    total,
  },
});

export { PaginationResponse, BuildPagination };
