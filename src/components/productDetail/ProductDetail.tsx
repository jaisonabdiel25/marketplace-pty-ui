import Image from 'next/image'
import { ProductResponse } from '@/interfaces/Products'
import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { ProductDetailAction } from './ProductDetailAction'

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

            <ProductDetailAction product={product} />
        </div>
    )
}
