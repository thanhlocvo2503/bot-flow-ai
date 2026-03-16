export interface IBaseAuditableEntity {
    id: string;
    created: Date | string;
    createdBy?: string;
    lastModified?: Date | string;
    lastModifiedBy?: string;
    deletedDate?: Date | string;
    deletedBy?: string;
    isDeleted: boolean;
}
