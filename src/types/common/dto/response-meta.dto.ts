export interface IMetaInfo {
    // requestId: string;
    // requestId?: string;
    timestamp?: string;
    performanceMs?: number;
    version?: string;
}
export interface IPagination {
    page: number; // index started from 1
    limit: number; // page size
    count: number; // query count
    total: number; // total record
}
