
import { jwtDecode, JwtPayload } from "jwt-decode";
import { UserInfo } from '@/interfaces/Auth';
import Cookies from 'js-cookie';

export type customJwtPayload = JwtPayload & { data: UserInfo };

export const getTokenClient = () => {
    return Cookies.get('token');
}

export const isExpired = () => {
    const token = Cookies.get('token');

    if (!token) return true;
    const decodedToken = jwtDecode<customJwtPayload>(token);
    const currentDate = new Date();

    console.log('decodedToken', decodedToken)
    // JWT exp is in seconds
    if (decodedToken.exp && decodedToken.exp * 1000 < currentDate.getTime()) {
        return true;
    } else {
        return false;
    }
}

export const decodedToken = () => {
    const token = Cookies.get('token');
    if (!token) return null;
    return jwtDecode<customJwtPayload>(token);
}

export const removeToken = () => {
    Cookies.remove('token');
}

