import { CustomTitle } from "@/components/Customs/CustomTitle";
import { GlobalResponse } from "@/interfaces/global";
import { OrderListResponse } from "@/interfaces/order";
import { cookies } from 'next/headers';
import Link from "next/link";
import { IoCardOutline } from "react-icons/io5";

const getOrders = async (): Promise<GlobalResponse<OrderListResponse[]>> => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const url = `${apiUrl}/sales/user`

    const cookiesStore = cookies();
    const token = cookiesStore.get('token')?.value;

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
            console.log(error)
        })


    return await response;
}

export default async function OrderPage() {

    const orders = await getOrders();

    return (

        <>
            <div className="mb-10 px-10">

                <CustomTitle title="Orders" />
                <table className="min-w-full">
                    <thead className="bg-gray-200 border-b">
                        <tr>
                            <th
                                scope="col"
                                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                            >
                                #ID
                            </th>
                            <th
                                scope="col"
                                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                            >
                                Nombre completo
                            </th>
                            <th
                                scope="col"
                                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                            >
                                Estado
                            </th>
                            <th
                                scope="col"
                                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                            >
                                Opciones
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.data.map((order) => (
                            <tr
                                key={order.id}
                                className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                            >
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {order.id.split("-").at(-1)}
                                </td>
                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    {order.user?.firstName} {order.user?.name}
                                </td>
                                <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    {order.isPaid ? (
                                        <>
                                            <IoCardOutline className="text-green-800" />
                                            <span className="mx-2 text-green-800">Pagada</span>
                                        </>
                                    ) : (
                                        <>
                                            <IoCardOutline className="text-red-800" />
                                            <span className="mx-2 text-red-800">No Pagada</span>
                                        </>
                                    )}
                                </td>
                                <td className="text-sm text-gray-900 font-light px-6 ">
                                    <Link href={`/orders/${order.id}`} className="hover:underline">
                                        Ver orden
                                    </Link>
                                </td>
                            </tr>
                        ))}


                    </tbody>
                </table>
            </div>
        </>

    );
}