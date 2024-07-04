import { CustomTitle } from '@/components/Customs/CustomTitle';
import { OrderSummary } from '@/components/Card/OrderSummary';
import { CartdDetailToProducts } from '@/components/Card/CartdDetailToProducts';

export default function CartPage() {

    return (
        <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
            <div className="flex flex-col w-[1000px]">
                <CustomTitle title='Carrito' />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                    {/* Carrito */}
                    <CartdDetailToProducts />

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