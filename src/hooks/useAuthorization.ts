

import { jwtDecode, JwtPayload } from "jwt-decode";
import { UserInfo } from '@/interfaces/Auth';
import { useEffect, useMemo, useState } from 'react';
import { useUserStore } from '@/store/user.store';
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";

export type customJwtPayload = JwtPayload & { data: UserInfo };

export const useAuthorization = () => {

    const [token, seTtoken] = useState<string | undefined>(undefined);
    const router = useRouter();

    const tokenStorage = useUserStore(state => state.token);
    const setToken = useUserStore(state => state.setToken);

    const resetAuth = () => {
        setToken('');
        Cookies.remove('token');
        router.push('/login');
    }

    useEffect(() => {
        // Esto asegura que el token solo se establezca en el cliente
        const cookieToken = Cookies.get('token');
        seTtoken(cookieToken ?? tokenStorage);
    }, [tokenStorage]);

    const isExpired = useMemo(() => {
        if (!token && !tokenStorage) return true;

        const decodedToken = jwtDecode<customJwtPayload>(token ?? tokenStorage);
        const currentDate = new Date();
        // JWT exp is in seconds
        if (decodedToken.exp && decodedToken.exp * 1000 < currentDate.getTime()) {
            return true;
        } else {
            return false;
        }
    }, [token, tokenStorage])

    return {
        isExpired,
        resetAuth,
        token,
    }
}
