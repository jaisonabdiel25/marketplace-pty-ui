export interface ProductResponse {
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
    createBy?: CreateBy;
    category?: Category;
}

export interface Image {
    id: string;
    url: string;
    productId: string;
    createAt: Date;
}

export interface Category {
    id: string;
    description: string;
}

export interface CreateBy {
    id: string;
    email: string;
    name: string;
    firstName: string;
    img: null;
    createAt: Date;
    phone: null;
    active: boolean;
}