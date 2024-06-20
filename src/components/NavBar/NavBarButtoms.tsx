'use client'

import { jwtDecode, JwtPayload } from "jwt-decode";
import { Button } from "../ui/button";
import Link from "next/link";
import { UserInfo } from "@/interfaces/Auth";

export type customJwtPayload = JwtPayload & { data: UserInfo };

export const NavBarButtoms = () => {

    const token = localStorage.getItem('token');

    const isExpired = () => {

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

    const decodedToken = () => {
        if (!token) return null;
        return jwtDecode<customJwtPayload>(token);
    }


    return (
        <div className="px-2">
            {token && !isExpired() ?
                <div className="flex items-center min-w-[200px] justify-between">
                    <span>Hola {decodedToken()?.data.name}</span>
                    <Link href={'/product/new_product'}>
                        <Button
                            className="me-3 inline-block rounded px-2 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal"
                        >
                            Vender
                        </Button>
                    </Link>
                </div>
                :
                <div className="flex items-center">
                    <Link href={'/login'}>
                        <Button
                            className="me-3 inline-block rounded px-2 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal"
                            onClick={() => localStorage.removeItem('token')}>
                            Iniciar sesión
                        </Button>
                    </Link>
                </div>
            }
        </div>

    )
}
