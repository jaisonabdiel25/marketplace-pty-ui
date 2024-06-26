
import { ProductResponse } from '@/interfaces/Products';
import { useState } from 'react';

interface Props {
    initialProduct?: ProductResponse[]

}
export const useServicesProduct = ({ initialProduct }: Props) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const [productDetail, setProductDetail] = useState(initialProduct as ProductResponse[])

    const fetchApi = async (url: string, body = null, method = 'GET') => {


        const response = await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json",
            },
            body: body ? JSON.stringify(body) : undefined,
        })
            .then((response) => {
                if (response.ok) {

                }
                return response.json()
            })
            .catch((error) => {
                console.log(error)
            })


        return await response;
    }

    const getProducts = async (page: number): Promise<void> => {
        const result = await fetchApi(`${apiUrl}/products?page=${page}&size=10`);
        setProductDetail(result);
    }

    return {
        getProducts,
        productDetail
    }
}
