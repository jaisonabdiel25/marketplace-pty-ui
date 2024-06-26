

import { ProductGrid } from '@/components/product/ProductGrid';
import React from 'react'

const getProducts = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const url = `${apiUrl}/products?page=?0&size=10`

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },
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


