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
}

export interface Image {
    id: string;
    url: string;
    productId: string;
    createAt: Date;
}
