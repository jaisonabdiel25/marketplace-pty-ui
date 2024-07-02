export interface OrderListResponse {
    id: string;
    total: number;
    totalItems: number;
    isPaid: boolean;
    paidAt?: Date;
    createAt: Date;
    updateAt: Date;
    userId: string;
    user: User;
    subTotal: number;
}

export interface User {
    id: string;
    email: string;
    name: string;
    firstName: string;
    password: string;
    img: null;
    createAt: Date;
    phone: null;
    active: boolean;
}

export interface OrderResponse {
    id: string;
    total: number;
    subtotal: number;
    totalItems: number;
    isPaid: boolean;
    paidAt: null;
    createAt: Date;
    updateAt: Date;
    userId: string;
    user: User;
    SaleItem: SaleItem[];
    tax: number;
}

export interface SaleItem {
    id: string;
    saleId: string;
    productId: string;
    price: number;
    createAt: Date;
    product: Product;
}

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    img: null;
    createAt: Date;
    updateAt: Date;
    active: boolean;
    createById: string;
    categoryId: string;
    images: Image[];
}

export interface Image {
    id: string;
    url: string;
    productId: string;
    createAt: Date;
}

export interface OrderRequest {
    tax: number;
    total: number;
    subtotal: number;
    productsId: string[];
}


