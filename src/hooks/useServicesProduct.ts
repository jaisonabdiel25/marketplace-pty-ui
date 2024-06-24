
import { cookies } from 'next/headers';
import { jwtDecode } from "jwt-decode";
import { UserInfo } from '@/interfaces/Auth';
import { Category } from '@/interfaces/Products';
import { GlobalResponse } from '@/interfaces/global';

export const useServicesProduct = () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const getToken = (): string => {
        const cookiesStore = cookies();
        const token = cookiesStore.get('token');
        return token?.value ?? '';
    }

    const fetchApi = async (url: string, body = null, method = 'GET') => {

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


        return await response;
    }

    const getProducts = async <R>(): Promise<R> => {
        return await fetchApi(`${apiUrl}/products`);
    }

    const getProduct = async <R>(id: string): Promise<R> => {
        return await fetchApi(`${apiUrl}/products/${id}`);
    }

    const decodedToken =  (): UserInfo => {
        const token = getToken();
       return jwtDecode<UserInfo>(token)
    }

    const getCategories = async(): Promise<GlobalResponse<Category[]>> => {
        return await fetchApi(`${apiUrl}/categories`);
    }

    return {
        getProducts,
        getProduct,
        decodedToken,
        getCategories,
    }
}
