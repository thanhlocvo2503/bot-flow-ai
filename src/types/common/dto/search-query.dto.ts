import { IPagination } from './';

export enum SORT_DIRECTION {
    ASC = 'ASC',
    DESC = 'DESC',
}

export interface ISearchQueryDTO {
    filters?: Record<string, string | number | boolean | string[]>;
    sort?: Record<string, SORT_DIRECTION>;
    pagination?: Pick<IPagination, 'page' | 'limit'>;
}
