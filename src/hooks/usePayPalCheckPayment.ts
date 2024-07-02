'use client'
import { PayPalOrderStatusResponse, PaymentSale } from "@/interfaces/Payment";
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";


interface Props {
    orderId: string;
}

export const usePayPalCheckPayment = (props: Props) => {

    const { orderId: orderIdinProps } = props;
    const router = useRouter();
    const paypalCheckPayment = async (request: PaymentSale) => {

        const authToken = await getPayPalBearerToken();

        if (!authToken) {
            return {
                ok: false,
                message: "No se pudo obtener token de verificación",
            };
        }

        const resp = await verifyPayPalPayment(request.transactionId, authToken);

        if (!resp) {
            return {
                ok: false,
                message: 'Error al verificar el pago'
            }
        }

        const { status, purchase_units } = resp;
        const { invoice_id: orderId } = purchase_units[0]; // TODO: invoice ID

        if (status !== 'COMPLETED') {
            return {
                ok: false,
                message: 'Aún no se ha pagado en PayPal'
            }
        }

        // TODO: Realizar la actualización en nuestra base de datos
        try {

            await updatePayment(request)


            // TODO: Revalidar un path

            router.push(`/orders/${orderIdinProps}`);

            return {
                ok: true
            }


        } catch (error) {
            console.log(error);
            return {
                ok: false,
                message: '500 - El pago no se pudo realizar'
            }
        }
    };


    const updatePayment = async (body: PaymentSale): Promise<void> => {

        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const url = `${apiUrl}/sales/payments`;
        const token = Cookies.get('token') ?? '';

        await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
            cache: 'no-cache',

        }).then((response) => {
            if (response.ok) {
                return response.json();
            }
        }).catch((error) => {
            console.log(error)
        })
    }



    const getPayPalBearerToken = async (): Promise<string | null> => {
        const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
        const PAYPAL_SECRET = process.env.NEXT_PUBLIC_PAYPAL_SECRET;
        const oauth2Url = process.env.NEXT_PUBLIC_PAYPAL_OAUTH_URL ?? "";

        const base64Token = Buffer.from(
            `${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`,
            "utf-8"
        ).toString("base64");

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        myHeaders.append("Authorization", `Basic ${base64Token}`);

        const urlencoded = new URLSearchParams();
        urlencoded.append("grant_type", "client_credentials");

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: urlencoded,
        };

        try {
            const result = await fetch(oauth2Url, {
                ...requestOptions,
                cache: 'no-store'
            }).then((r) => r.json());
            return result.access_token;
        } catch (error) {
            console.log(error);
            return null;
        }
    };

    const verifyPayPalPayment = async (paypalTransactionId: string, bearerToken: string): Promise<PayPalOrderStatusResponse | null> => {

        const paypalOrderUrl = `${process.env.NEXT_PUBLIC_PAYPAL_ORDERS_URL}/${paypalTransactionId}`;

        const myHeaders = new Headers();
        myHeaders.append(
            "Authorization",
            `Bearer ${bearerToken}`
        );

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
        };

        try {
            const resp = await fetch(paypalOrderUrl, {
                ...requestOptions,
                cache: 'no-store'
            }).then(r => r.json());
            return resp;

        } catch (error) {
            console.log(error);
            return null;
        }

    };


    return {
        paypalCheckPayment
    }
}
