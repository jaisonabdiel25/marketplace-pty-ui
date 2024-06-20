import { ProductResponse } from "@/interfaces/Products"
import { Button } from "../ui/button"

interface Props {
    product: ProductResponse
}

export const ProductDetailAction = ({ product }: Props) => {
    return (
        <div className='flex justify-center'>
            <div className='flex flex-col justify-around items-center  rounded-md  min-w-[450px] xl:min-w-[500px] max-w-md px-4' >
                <div>
                    <h1 className="text-3xl font-semibold my-2 camell">{product.name.toUpperCase()}</h1>
                        <h2 className="text-xl my-2">${product.price}</h2>
                    <p className="text-lg my-2">{product.description}</p>
                </div>

                <Button className='mt-4 w-full'>Comprar</Button>
            </div>
        </div>
    )
}
