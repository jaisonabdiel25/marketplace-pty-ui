import { useServicesProduct } from '@/hooks/useServicesProduct';
import { ProductResponse } from '@/interfaces/Products';
import { ProductItem } from './ProductItem';


export const ProductGrid = async () => {

  const { getProducts } = useServicesProduct<unknown, ProductResponse[]>();

  const data = await getProducts();

  return (
    <div className='flex flex-wrap justify-center gap-8 mt-8' >
      {data?.length > 0 && data.map((product) => (
        <>
          <ProductItem key={product.id} product={product} />
        </>
      ))}
    </div>
  )
}
