
'use client';
import { ProductResponse } from "@/interfaces/Products";
import { useEffect, useState } from "react";
import { ProductItem } from "./ProductItem";
import { Skeleton } from "../ui/skeleton";
import { CustomSkeleton } from "../Customs/CustomSkeleton";

interface Props {
    products: ProductResponse[]
}



export const ProductByCategory = (props: Props) => {

    const { products } = props


    const [isLoad, setIsLoad] = useState(false);

    useEffect(() => {
        setIsLoad(true)
    }, [])



    if (!isLoad) {
        return (
            <div className="mx-24 mt-28 flex flex-wrap justify-center gap-8 my-8">
            <CustomSkeleton number={4} />
            </div>
        )
    }

    return (
        <div className="mx-24 mt-28">
            <h1 className="text-3xl font-bold">Algunos productos que te podrian gustar</h1>
            <div className="flex flex-wrap gap-8 my-8">

                {products.length > 0 && products.map((product) => (
                    <>
                        <ProductItem key={product.id} product={product} />
                    </>
                ))}
            </div>
        </div>
    )
}
