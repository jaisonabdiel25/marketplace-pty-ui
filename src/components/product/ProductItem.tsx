
import { ProductResponse } from '@/interfaces/Products';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';

interface Props {
  product: ProductResponse;

}
export const ProductItem = (props: Props) => {
  const { product } = props;
  return (
    <>
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 overflow-hidden flex flex-col justify-between min-h-[400px] flex-0">
        <div className='flex justify-center items-center'>
          <Image src={product.images[0].url} width={500} height={500} alt={product.name} className='max-h-[300px] object-contain items-center flex justify-center' />
        </div>

        <div className=" flex flex-col px-5 pb-5 mt-8">
            <h1 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{product.name}</h1>
          <div className="flex items-center justify-between mt-5">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">${product.price}</span>
            <Button variant={'secondary'} className='text-white bg-orange-600 hover:bg-orange-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
              <Link href={`/product/${product.id}`} >
                Ver detalle
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
