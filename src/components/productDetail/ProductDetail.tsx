
import Image from 'next/image'
import dynamic from 'next/dynamic'

import { ProductResponse } from '@/interfaces/Products'
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, } from "@/components/ui/carousel"
import { Suspense } from 'react'

const DynamicProductDetailAction = dynamic(() => import("./ProductDetailAction"), { ssr: false });

interface Props {
    product: ProductResponse
}

export const ProductDetail = ({ product }: Props) => {

    return (
        <div className='flex justify-evenly gap-6 flex-col lg:flex-row item-center py-6'>
            <div className='flex justify-center'>
                <Carousel className="w-full max-w-md">
                    <CarouselContent>
                        {product.images?.map((image) => (
                            <CarouselItem key={image.id}>
                                <div key={image.id}>
                                    <Card key={image.id}>
                                        <CardContent key={image.id} className="flex aspect-square items-center justify-center p-6">
                                            <Image key={image.id} src={image.url} width={500} height={500} alt={product.name} className='max-h-[500px] object-contain' />
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

            <Suspense fallback={<div className='w-full h-screen flex items-center justify-center bg-red-800'> cargando</div>} >
                <DynamicProductDetailAction product={product} />
            </Suspense>
        </div>
    )
}
