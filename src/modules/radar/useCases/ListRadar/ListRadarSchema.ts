import { number, object, boolean, string, enum as ENUM } from 'zod';

const ListRadarSchema = object({
  dataControl: object({
    limit: number().int().optional().default(100),
    offset: number().int().optional().default(0),
    paging: boolean().optional().default(true),
  }).optional().default({
    limit: 100,
    offset: 0,
    paging: true,
  }),
  orderBy: object({
    order: number().optional().default(1),
    attribute: ENUM(['ID', 'NAME', 'CREATED']).default('ID'),
    direction: ENUM(['ASC', 'DESC']).default('ASC'),
  }).array().default([{
    order: 1,
    attribute: 'ID',
    direction: 'ASC',
  }]),
  filters: object({
    id: number().optional(),
    createdBegin: string().refine((data) => Date.parse(data)).transform((data) => new Date(data)).optional(),
    createdEnd: string().refine((data) => Date.parse(data)).transform((data) => new Date(data)).optional(),
  }).optional(),
});

interface ListRadarType {
  dataControl: {
    limit: number;
    offset: number;
    paging: boolean;
  };
  orderBy: Array<{
    order: number;
    attribute: string;
    direction: ('ASC' | 'DESC');
  }>;
  filters?: {
    id?: number;
    createdBegin?: Date;
    createdEnd?: Date;
  }
}

export { ListRadarSchema, ListRadarType };
