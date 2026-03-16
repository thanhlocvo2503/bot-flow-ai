// Types
import { IBaseResponse, IErrorInfo } from '@/types/common/dto';

// Logging
import { logResponse } from './logging';

enum HTTP_METHOD {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
}

export type Pagination = {
    page: number;
    limit: number;
    total: number;
};

export type reqProps = {
    endpoint: string;
    body?: Record<string, any>;
    method?: HTTP_METHOD;
    headers?: HeadersInit;
    // auth: boolean
};

export async function req<T>({
    endpoint,
    method = HTTP_METHOD.GET,
    body,
    headers,
}: reqProps) {
    try {
        const accessToken = 'token123';

        const requestHeaders = {
            ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
            ...headers,
        };

        const defaultHeaders: HeadersInit = {
            'Content-Type': 'application/json',
            ...requestHeaders,
        };

        const requestOptions: RequestInit = {
            method,
            headers: headers || defaultHeaders,
            body: body ? JSON.stringify(body) : undefined,
            // include credential
            ...(accessToken && { credentials: 'include' }),
        };

        const start = performance.now();

        const response = await fetch(endpoint, requestOptions);

        if (!response.ok) {
            const resposneData = await response.json();
            const err = resposneData.error as IBaseResponse<IErrorInfo>;

            throw err;
        }

        const timeTaken = performance.now() - start;

        logResponse(method, response, timeTaken);

        return (await response.json()) as IBaseResponse<T>;
    } catch (error) {
        const err = error as IErrorInfo;

        // TODO: Update later
        // if (err.message === ERROR_MESSAGES.JWT_EXPIRED) {
        //     useAuthStore.getState().logout();
        // }

        throw err;
    }
}

export class ApiRequest {
    get<T>(props: reqProps) {
        return req<T>({ ...props, method: HTTP_METHOD.GET });
    }
    put<T>(props: reqProps) {
        return req<T>({ ...props, method: HTTP_METHOD.PUT });
    }
    post<T>(props: reqProps) {
        return req<T>({ ...props, method: HTTP_METHOD.POST });
    }
    delete<T>(props: reqProps) {
        return req<T>({ ...props, method: HTTP_METHOD.DELETE });
    }
    patch<T>(props: reqProps) {
        return req<T>({ ...props, method: HTTP_METHOD.PATCH });
    }
}

const apiRequest = new ApiRequest();
export default apiRequest;
