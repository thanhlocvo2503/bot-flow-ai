import { IPagination } from './';

export interface ICollectionDTO<T> {
    items: T[];
    pagination: IPagination;
    summary?: Record<string, number>; // totals, aggregates
}
