export interface BulkRequest<T> {
    operationId: string;
    items: T[];
    // options?: {
    //     dryRun?: boolean;
    //     strictMode?: boolean;
    // };
}
