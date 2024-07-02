export interface GlobalResponse<T>{
    data: T;
    message?: string
    totalItems?: number;
}

export interface GlobalSelect<T>{
    label: string;
    id: string;
    value: T
}