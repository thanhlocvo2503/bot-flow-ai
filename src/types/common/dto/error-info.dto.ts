export interface IErrorInfo {
    code: string; // DOMAIN_ERROR | VALIDATION_ERROR | AUTH_ERROR
    message: string;
    detail?: string | unknown; // for debuging
    fieldErrors?: Array<IFieldError>;
}

export interface IFieldError {
    field: string; // keyof T
    message: Array<string>;
}
