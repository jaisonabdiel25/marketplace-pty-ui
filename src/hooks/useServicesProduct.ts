
import { cookies } from 'next/headers';
import { jwtDecode } from "jwt-decode";
import { UserInfo } from '@/interfaces/Auth';

export const useServicesProduct = <T, R>() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const getToken = (): string => {
        const cookiesStore = cookies();
        const token = cookiesStore.get('token');
        return token?.value ?? '';
    }

    const fetchApi = async (url: string, body = null, method = 'GET'): Promise<R> => {

        const token = getToken();

        const response = await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json",
                "bearer": token
            },
            body: body ? JSON.stringify(body) : undefined,
        })
            .then((response) => {
                if (response.ok) {

                }
                return response.json()
            })
            .catch((error) => {
                console.log(error)
            })


        return await response as R;
    }

    const getProducts = async (): Promise<R> => {
        return await fetchApi(`${apiUrl}/products`);
    }

    const getProduct = async (id: string): Promise<R> => {
        return await fetchApi(`${apiUrl}/products/${id}`);
    }

    const decodedToken =  (): UserInfo => {
        const token = getToken();
       return jwtDecode<UserInfo>(token)
    }

    return {
        getProducts,
        getProduct,
        decodedToken
    }
}
