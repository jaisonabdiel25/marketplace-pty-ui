'use client'

import { ProductResponse } from '@/interfaces/Products';
import { GlobalResponse } from '@/interfaces/global';
import { useProductStore } from '@/store/products.store';
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react';


interface Props {
    initialProduct?: GlobalResponse<ProductResponse[]>

}
export const useServicesProduct = ({ initialProduct }: Props) => {

    const search = useProductStore(state => state.search);

    const pathname = usePathname()

    useEffect(() => {
        if (pathname === '/dashboard' && search != '' && search) {
            getProducts(0, search)
        }else if(pathname === '/dashboard' && search === ''){
            getProducts(0)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);


    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const [productDetail, setProductDetail] = useState(initialProduct as GlobalResponse<ProductResponse[]>)

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

    const getProducts = async (page: number, search?: string): Promise<void> => {
        const url = search !== '' && search ? `${apiUrl}/products?page=${page}&size=10&search=${search}` : `${apiUrl}/products?page=${page}&size=10`
        const result = await fetchApi(`${url}`);
        setProductDetail(result);
    }

    return {
        getProducts,
        productDetail
    }
}
