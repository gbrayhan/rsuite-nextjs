

export interface ErrorResponse {
    message: string;
    status: number | undefined;
    code: string | undefined;
}


export type ObjectFormType = { [x: string]: string | Blob; }

export interface HttpResponse<T> {
    data: T;
    status: number;
    headers?: { [key: string]: string };
}