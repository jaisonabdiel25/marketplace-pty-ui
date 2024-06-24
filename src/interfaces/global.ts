export interface GlobalResponse<T>{
    data: T;
    message?: string
}

export interface GlobalSelect<T>{
    label: string;
    id: string;
    value: T
}