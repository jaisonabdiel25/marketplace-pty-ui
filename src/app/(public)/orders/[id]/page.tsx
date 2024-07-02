
import { CustomTitle } from "@/components/Customs/CustomTitle";
import { OrderStatus } from "@/components/Order/OrderStatus";
import { PayPalButton } from "@/components/paypal/PayPalButton";
import { currencyFormat } from "@/config/currencyFormat";
import {  OrderResponse } from "@/interfaces/order";
import { cookies } from 'next/headers';
import Image from "next/image";
import { redirect } from "next/navigation";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { UserInfo } from "@/interfaces/Auth";
import moment from 'moment-timezone';

export type customJwtPayload = JwtPayload & { data: UserInfo };

const getOrder = async (id: string): Promise<[boolean, OrderResponse?]> => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const url = `${apiUrl}/sales/${id}`


    const cookiesStore = cookies();
    const token = cookiesStore.get('token')?.value;

    if(!token){
        return [false, undefined]
    }

    const decodedToken = jwtDecode<customJwtPayload>(token);
    const currentDate = moment.tz('America/Panama').valueOf();

    if(decodedToken.exp && decodedToken.exp * 1000 < currentDate){
        return [false, undefined];
    }

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
        },
        cache: 'no-cache',
    })
        .then((response) => {
            if (response.ok) {
                return response.json()
            }
        })
        .catch((error) => {
            console.log(error);
        })


    return [true, response];
}

export default async function OrderItemsPage({ params }: { params: { id: string } }) {
    const { id } = params;

    // const { isExpired } = useAuthorization();



    const [ok, order] = await getOrder(id);

    if(!ok){
        redirect("/");
    }

    return (
        <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
        <div className="flex flex-col w-[1000px]">
          <CustomTitle title={`Orden #${id.split("-").at(-1)}`} />
  
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            {/* Carrito */}
            <div className="flex flex-col mt-5">
              <OrderStatus isPaid={order?.isPaid ?? false} />
  
              {/* Items */}
              {order!.SaleItem.map((item) => (
                <div
                  key={item.product.id}
                  className="flex mb-5"
                >
                  <Image
                    src={`${item.product.images[0].url}`}
                    width={100}
                    height={100}
                    style={{
                      width: "100px",
                      height: "100px",
                    }}
                    alt={item.product.name}
                    className="mr-5 rounded object-contain"
                  />
  
                  <div>
                    <p>{item.product.name}</p>
                    <p>
                      ${item.price}
                    </p>
                    <p className="font-bold">
                      Subtotal: {currencyFormat(item.price)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
  
            {/* Checkout - Resumen de orden */}
            <div className="bg-white rounded-xl shadow-xl p-7">
  
              <h2 className="text-2xl mb-2">Resumen de orden</h2>
  
              <div className="grid grid-cols-2">
                <span>No. Productos</span>
                <span className="text-right">
                  {order?.totalItems === 1
                    ? "1 artículo"
                    : `${order?.totalItems} artículos`}
                </span>
  
                <span>Subtotal</span>
                <span className="text-right">
                  {currencyFormat(order!.subtotal)}
                </span>
  
                <span>Impuestos (7%)</span>
                <span className="text-right">{currencyFormat(order!.tax)}</span>
  
                <span className="mt-5 text-2xl">Total:</span>
                <span className="mt-5 text-2xl text-right">
                  {currencyFormat(order!.total)}
                </span>
              </div>
  
              <div className="mt-5 mb-2 w-full">
                {order?.isPaid ? (
                <OrderStatus isPaid={order?.isPaid ?? false} />
                ) : (
                   <PayPalButton amount={order!.total} orderId={order!.id} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}