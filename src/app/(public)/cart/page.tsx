import Link from 'next/link';

import { CustomTitle } from '@/components/Customs/CustomTitle';
import { ProductsInCart } from '@/components/Card/ProductsInCart';
import { OrderSummary } from '@/components/Card/OrderSummary';
import { Button } from '@/components/ui/button';




export default function CartPage() {

    return (
        <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
            <div className="flex flex-col w-[1000px]">
                <CustomTitle title='Carrito' />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                    {/* Carrito */}
                    <div className="flex flex-col mt-5">
                        <span className="text-xl">Agregar más items</span>
                        <Link href="/" className="underline mb-5">
                            Continúa comprando
                        </Link>
                        {/* Items */}
                        <ProductsInCart />
                    </div>

                    {/* Checkout - Resumen de orden */}
                    <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
                        <h2 className="text-2xl mb-2">Resumen de orden</h2>

                        <OrderSummary />

                    </div>
                </div>
            </div>
        </div>
    );
}