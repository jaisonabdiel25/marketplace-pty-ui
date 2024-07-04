'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { ProductsInCart } from './ProductsInCart'
import { useCartStore } from '@/store/card.store';
import { useAuthorization } from '@/hooks/useAuthorization';
import { Skeleton } from '../ui/skeleton';

export const CartdDetailToProducts = () => {

  const { decodedToken } = useAuthorization();

  const [loaded, setLoaded] = useState(false);
  const productsInCart = useCartStore(state => state.getCartToUser(decodedToken?.id ?? ''));

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-16 w-16 rounded--sm" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[250px]" />
      </div>
    </div>)
  }
  return (
    <>
      <div className="flex flex-col mt-5">
        <span className="text-xl">Agregar más items</span>
        <Link href="/" className="underline mb-5">
          Continúa comprando
        </Link>
        {/* Items */}
        <ProductsInCart productsInCart={productsInCart} />
      </div>
    </>
  )
}
