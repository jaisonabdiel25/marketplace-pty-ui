
import { cookies } from 'next/headers';

export const useServicesProduct = <T, R>() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const getToken = (): string => {
        const cookiesStore = cookies();
        const token2 = cookiesStore.get('token');
        return token2?.value ?? '';
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

    return {
        getProducts
    }
}
