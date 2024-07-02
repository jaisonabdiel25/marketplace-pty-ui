

import { ProductGrid } from '@/components/product/ProductGrid';
import { ProductResponse } from '@/interfaces/Products';
import { GlobalResponse } from '@/interfaces/global';
import React from 'react'

const getProducts = async (): Promise<GlobalResponse<ProductResponse[]>> => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const url = `${apiUrl}/products?page=?0&size=10`

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },
        cache: 'no-store'
    })
        .then((response) => {
            if (response.ok) {
                return response.json()     
            }
        })
        .catch((error) => {
            console.log(error)
        })


    return await response;
}

const DashboardPage = async() => {

    const initialProduct = await getProducts();

    return (
        <div>
            <ProductGrid initialProduct={initialProduct} />
        </div>
    )
}

export default DashboardPage


