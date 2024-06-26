'use client'
import { useServicesProduct } from '@/hooks/useServicesProduct';
import { ProductItem } from './ProductItem';
import { CustomPagination } from '../Customs/CustomPagination';
import { useEffect } from 'react';
import { ProductResponse } from '@/interfaces/Products';


interface Props {
  initialProduct:  ProductResponse[]
}

export const ProductGrid = (props: Props) => {

  const { initialProduct } = props;

  const { getProducts, productDetail } = useServicesProduct({initialProduct});


  return (
    <div className='my-8'>


      <div className='flex flex-wrap justify-center gap-8 my-8' >
        {productDetail?.length > 0 && productDetail.map((product) => (
          <>
            <ProductItem key={product.id} product={product} />
          </>
        ))}

      </div>

      <div className='flex justify-center mx-8 my-8'>
      <CustomPagination onAction={(value) => getProducts(value)} />

      </div>
    </div>

  )
}
