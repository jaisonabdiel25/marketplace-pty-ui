import { ProductResponse, RequestProduct } from '@/interfaces/Products';
import { GlobalResponse } from '@/interfaces/global';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useState } from 'react';


interface Props {
    setIsLoading: (value: boolean) => void;
}
export const useServicesProductAction = (props: Props) => {

    const { setIsLoading } = props;

    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false)

    const resetStates = () => {
        setIsError(false);
        setMessage('');
        setIsSuccess(false);
    }

    const router = useRouter();
    const createProductApi = async (body: FormData, method: string): Promise<GlobalResponse<ProductResponse>> => {
        setIsLoading(true);
        resetStates();
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const url = `${apiUrl}/products`;
        const token = Cookies.get('token') ?? '';

        const response = await fetch(url, {
            method,
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: body,

        }).then((response) => {
            if (response.ok) {
                setIsSuccess(true);
                setMessage('Producto creado con éxito');
                return response.json();
            } else {
                setIsError(true);
                setMessage('Error al crear el producto');
                if (response.status === 401) {
                    return router.push('/login');
                }
            }
        })
            .catch((error) => {
                console.log(error)
            })

        setIsLoading(false);

        return response;
    }

    const updateProductApi = async (id: string, body: RequestProduct, method: string): Promise<GlobalResponse<ProductResponse>> => {
        setIsLoading(true);
        resetStates();

        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const url = `${apiUrl}/products/${id}`;
        const token = Cookies.get('token') ?? '';

        const response = await fetch(url, {
            method,
            headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),

        }).then((response) => {
            if (response.ok) {
                setMessage('Producto actualizado con éxito');
                setIsSuccess(true);
                return response.json();
            } else {
                setIsError(true);
                setMessage('Error al actualizar el producto');
                if (response.status === 401) {
                    return router.push('/login');
                }
            }
        })
            .catch((error) => {
                console.log(error)
            })

        setIsLoading(false);
        return response;
    }
    return {
        createProductApi,
        updateProductApi,
        isError,
        message,
        isSuccess
    }
}