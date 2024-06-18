
import { useServicesProduct } from '@/hooks/useServicesProduct';
import React from 'react'

const DashboardPage = async () => {

    const { getProducts } = useServicesProduct();

    const data = await getProducts();

    return (
        <div>{JSON.stringify(data)}</div>
    )
}

export default DashboardPage


