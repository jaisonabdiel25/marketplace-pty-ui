'use client'

import Link from "next/link";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { useUserStore } from "@/store/user.store";
import { Button } from "../ui/button";
import { UserInfo } from "@/interfaces/Auth";
import { useEffect, useMemo, useState } from "react";
import Cookies from 'js-cookie';
import { SheetSide } from "../Customs/CustomSheetSide";
import { IoCartOutline } from "react-icons/io5";
import { useCartStore } from "@/store/card.store";


export type customJwtPayload = JwtPayload & { data: UserInfo };

export const NavBarButtoms = () => {

    const tokenStorage = useUserStore(state => state.token);
    const setToken = useUserStore(state => state.setToken);
    const totalItemsInCart = useCartStore((state) => state.getTotalItems());

    const [token, seTtoken] = useState<string | undefined>(undefined)

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

    const decodedToken = useMemo(() => {
        if (!token && !tokenStorage) return null
        return jwtDecode<customJwtPayload>(token ?? tokenStorage);
    }, [token, tokenStorage])

    return (
        <>
            {!isExpired ?
                <div className="flex items-center min-w-[200px] justify-between gap-8 mx-2">
                    <h1 className="mx-4" >Hola {decodedToken?.data.name}</h1>
                    <Link href={'/product/new_product'}>
                        <Button
                            className="me-3 inline-block rounded px-4 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal"
                        >
                            Vender
                        </Button>
                    </Link>

                    <Link href={"/cart"} className="mx-2">
                        <div className="relative">
                            {
                                <h1 className="fade-in absolute text-xs px-1 rounded-full font-bold -top-2 -right-2 bg-blue-700 text-white">
                                    {totalItemsInCart}
                                </h1>
                            }
                            <IoCartOutline className="w-5 h-5" />
                        </div>
                    </Link>

                    <Link href={'/login'}>
                        <svg onClick={() => {
                            Cookies.remove('token');
                            setToken('');
                        }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path fill-rule="evenodd" d="M16.5 3.75a1.5 1.5 0 0 1 1.5 1.5v13.5a1.5 1.5 0 0 1-1.5 1.5h-6a1.5 1.5 0 0 1-1.5-1.5V15a.75.75 0 0 0-1.5 0v3.75a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V5.25a3 3 0 0 0-3-3h-6a3 3 0 0 0-3 3V9A.75.75 0 1 0 9 9V5.25a1.5 1.5 0 0 1 1.5-1.5h6ZM5.78 8.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 0 0 0 1.06l3 3a.75.75 0 0 0 1.06-1.06l-1.72-1.72H15a.75.75 0 0 0 0-1.5H4.06l1.72-1.72a.75.75 0 0 0 0-1.06Z" clip-rule="evenodd" />
                        </svg>
                    </Link>

                    <SheetSide side={'right'} />
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
        </>

    )
}
