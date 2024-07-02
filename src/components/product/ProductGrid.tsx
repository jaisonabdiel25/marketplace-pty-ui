'use client'
import { useServicesProduct } from '@/hooks/useServicesProduct';
import { ProductItem } from './ProductItem';
import { CustomPagination } from '../Customs/CustomPagination';
import { ProductResponse } from '@/interfaces/Products';
import { GlobalResponse } from '@/interfaces/global';


interface Props {
  initialProduct: GlobalResponse<ProductResponse[]>
}

export const ProductGrid = (props: Props) => {

  const { initialProduct } = props;

  const { getProducts, productDetail } = useServicesProduct({ initialProduct });


  return (
    <div className='my-8'>


      <div className='flex flex-wrap justify-center gap-8 my-8' >
        {productDetail?.data?.length > 0 && productDetail.data.map((product) => (
          <>
            <ProductItem key={product.id} product={product} />
          </>
        ))}

      </div>

      <div className='flex justify-center mx-8 my-8'>
        <CustomPagination totalItems={productDetail?.totalItems ?? 0} onAction={(value) => getProducts(value)} />
      </div>
    </div>

  )
}
