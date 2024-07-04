
import Image from 'next/image'

import { ProductResponse } from '@/interfaces/Products'
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, } from "@/components/ui/carousel"
import { ProductDetailAction } from './ProductDetailAction'
import { ProductByCategory } from '../product/ProductByCategory'


interface Props {
    product: ProductResponse
}

const getProductByCategory = async (id: string): Promise<ProductResponse[]> => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const url = `${apiUrl}/products/category/${id}?page=?0&size=4`
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },
        cache: 'no-cache',
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

export const ProductDetail = async ({ product }: Props) => {

    const products = await getProductByCategory(product.category!.id);

    return (
        <>
            <div className='flex justify-evenly gap-6 flex-col lg:flex-row item-center py-6'>
                <div className='flex justify-center'>
                    <Carousel className="w-full max-w-md">
                        <CarouselContent>
                            {product.images?.map((image) => (
                                <CarouselItem key={image.id}>
                                    <div>
                                        <Card >
                                            <CardContent className="flex aspect-square items-center justify-center p-6">
                                                <Image src={image.url} width={500} height={500} alt={product.name} className='max-h-[500px] object-contain' />
                                            </CardContent>
                                        </Card>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </div>
                <ProductDetailAction product={product} />
            </div>

            <div>
                <ProductByCategory products={products} />
            </div>
        </>
    )
}
