import { useServicesProduct } from '@/hooks/useServicesProduct';
import { ProductResponse } from '@/interfaces/Products';
import { ProductItem } from './ProductItem';


export const ProductCard = async () => {

  const { getProducts } = useServicesProduct<unknown, ProductResponse[]>();

  const data = await getProducts();

  return (
    <div className='flex flex-wrap justify-center gap-8 mt-8' >
      {data.map((product) => (
        <>
          <ProductItem key={product.id} product={product} />
        </>
      ))}
    </div>
  )
}
