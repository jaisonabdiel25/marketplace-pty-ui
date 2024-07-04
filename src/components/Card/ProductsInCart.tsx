'use client';
import { useEffect, useState } from 'react';

import Link from 'next/link';
import { useCartStore } from '@/store/card.store';
import { ProductImage } from '../Customs/ProductImage';
import { useAuthorization } from '@/hooks/useAuthorization';
import { ProductResponse } from '@/interfaces/Products';



interface Props {
  productsInCart: ProductResponse[];

}
export const ProductsInCart = ({productsInCart}: Props) => {

  const removeProduct = useCartStore(state => state.removeProduct);

  return (
    <>
      {productsInCart.map((product) => (
        <div key={`${product.id}`} className="flex mb-5">
          <ProductImage
            src={product.images[0].url}
            width={100}
            height={100}
            style={{
              width: "100px",
              height: "100px",
            }}
            alt={product.name}
            className="mr-5 rounded object-contain"
          />

          <div>
            <Link
              className="hover:underline cursor-pointer"
              href={`/product/${product.id} `}>
              {product.name}
            </Link>

            <p>${product.price}</p>

            <button
              onClick={() => removeProduct(product)}
              className="underline mt-3">Remover</button>
          </div>
        </div>
      ))}
    </>
  );
};
