import { useState } from "react";

export const useServices = <T, R>() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false)


    const fetchApi = async (body: T, url: string, method = 'GET'): Promise<R> => {
        setIsLoading(true);
        setIsError(false);
        setIsSuccess(false);
        const response = await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        })
            .then((response) => {
                if (response.ok) {
                    setIsSuccess(true);
                }
                return response.json()
            })
            .catch((error) => {
                setIsError(true);
            })
            .finally(() => setIsLoading(false));

        return await response as R;
    }

    const fetchLogin = async (body: T): Promise<R> => {
        const URL = `${apiUrl}/users/login`;

        return fetchApi(body, URL, 'POST');
    }

    const fetchRegister = async (body: T): Promise<R> => {
        const URL = `${apiUrl}/users`;
        return fetchApi(body, URL, 'POST');
    }


    return {
        fetchLogin,
        fetchRegister,
        isError,
        isLoading,
        isSuccess
    }
}
