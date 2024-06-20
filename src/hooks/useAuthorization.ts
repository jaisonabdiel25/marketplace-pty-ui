import { cookies } from 'next/headers';
import { jwtDecode, JwtPayload } from "jwt-decode";
import { UserInfo } from '@/interfaces/Auth';

export type customJwtPayload = JwtPayload & { data: UserInfo };

export const useAuthorization = () => {

    const validToken = (): boolean => {
        const cookiesStore = cookies();
        const token = cookiesStore.get('token');

        if (!token) return false;

        const decodedToken = jwtDecode<customJwtPayload>(token.value);
        const currentDate = new Date();

        if (decodedToken.exp && decodedToken.exp * 1000 < currentDate.getTime()) {
            return false;
        } else {
            return true;
        }
    }

    return {
        validToken
    }
}
