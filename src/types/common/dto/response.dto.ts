import { IErrorInfo, IMetaInfo } from './';

export interface IBaseResponse<T> {
    success: boolean;
    data?: T;
    error?: IErrorInfo | null;
    meta?: IMetaInfo;
}

export interface IActionResultDTO {
    success: boolean;
    affectedIds?: string[];
    warnings?: string[];
}
