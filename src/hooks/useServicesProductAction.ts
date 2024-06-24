import { ProductResponse, RequestProduct } from '@/interfaces/Products';
import { GlobalResponse } from '@/interfaces/global';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';


export const useServicesProductAction = () => {

    const router = useRouter();
    const createProductApi = async (body: FormData, method: string): Promise<GlobalResponse<ProductResponse>> => {

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
                return response.json();
            }else{
                if (response.status === 401) {
                    return router.push('/login');
                }
            }
        })
            .catch((error) => {
                console.log(error)
            })

        return await response;
    }

    const updateProductApi = async (id: string,body: RequestProduct, method: string): Promise<GlobalResponse<ProductResponse>> => {

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
                return response.json();
            }else{
                if (response.status === 401) {
                    return router.push('/login');
                }
            }
        })
            .catch((error) => {
                console.log(error)
            })

        return await response;
    }
    return {
        createProductApi,
        updateProductApi,
    }
}