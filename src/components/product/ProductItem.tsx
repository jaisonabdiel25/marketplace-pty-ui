
import { ProductResponse } from '@/interfaces/Products';
import Image from 'next/image';

interface Props {
  product: ProductResponse;

}
export const ProductItem = (props: Props) => {
  const { product } = props;
  return (
    <>
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className='flex justify-center items-center'>

          <Image src={product.images[1].url} width={300} height={400} alt={product.description} />
        </div>

        <div className="px-5 pb-5">
          <a href="#">
            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{product.description}</h5>
          </a>
          <div className="flex items-center justify-between mt-5">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">${product.price}</span>
            <a href="#" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Ver detalle</a>
          </div>
        </div>
      </div>
    </>
  )
}
