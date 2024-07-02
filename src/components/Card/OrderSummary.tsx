"use client";

import { currencyFormat } from "@/config/currencyFormat";
import { useAuthorization } from "@/hooks/useAuthorization";
import { OrderRequest } from "@/interfaces/order";
import { useCartStore } from "@/store/card.store";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import CustomLoading from "../Customs/CustomLoading";

const createOrder = async (request: OrderRequest, token: string, setIsLoading: (value: boolean) => void) => {
  setIsLoading(true);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const url = `${apiUrl}/sales`

  let sussess = false;

  await fetch(url, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`,
    },
    cache: 'no-cache',
    body: JSON.stringify(request)
  })
    .then((response) => {
      if (response.ok) {
        sussess = true;
        return response.json()
      }
    })
    .catch((error) => {
      sussess = false;
      console.log(error)
    })

  setIsLoading(false);
  return {
    ok: sussess
  }

}

export const OrderSummary = () => {

  const { token } = useAuthorization();
  const [isLoading, setIsLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const productsInCart = useCartStore(state => state.cart);
  const { itemsInCart, subTotal, tax, total } = useCartStore((state) => state.getSummaryInformation());
  const clearCart = useCartStore(state => state.clearCart);

  const router = useRouter();

  const processOrder = async (): Promise<void> => {
    const request: OrderRequest = {
      tax: tax,
      total: total,
      subtotal: subTotal,
      productsId: productsInCart.map(product => product.id)
    }
    const { ok } = await createOrder(request, token!, setIsLoading);

    if (ok) {
      clearCart();
      router.push('/orders');
    }
  }

  useEffect(() => {
    setLoaded(true);
  }, []);


  if (!loaded) return <p>Loading...</p>;

  return (

    <>
      <CustomLoading open={isLoading} />
      <div className="grid grid-cols-2">
        <span>No. Productos</span>
        <span className="text-right">
          {itemsInCart === 1 ? "1 artículo" : `${itemsInCart} artículos`}
        </span>

        <span>Subtotal</span>
        <span className="text-right">{currencyFormat(subTotal)}</span>

        <span>Impuestos (7%)</span>
        <span className="text-right">{currencyFormat(tax)}</span>

        <span className="mt-5 text-2xl">Total:</span>
        <span className="mt-5 text-2xl text-right">{currencyFormat(total)}</span>


      </div>
      <Button onClick={() => {
        processOrder()
      }} className="mt-5 mb-2 w-full">
        Crear orden
      </Button>
    </>
  );
};
