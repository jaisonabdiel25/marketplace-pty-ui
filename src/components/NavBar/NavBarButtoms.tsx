'use client'

import Link from "next/link";
import { JwtPayload } from "jwt-decode";
import { Button } from "../ui/button";
import { UserInfo } from "@/interfaces/Auth";
import { SheetSide } from "../Customs/CustomSheetSide";
import { IoCartOutline } from "react-icons/io5";
import { useCartStore } from "@/store/card.store";
import { CustomAvatar } from "../Customs/CustomAvatar";
import { useAuthorization } from "@/hooks/useAuthorization";


export type customJwtPayload = JwtPayload & { data: UserInfo };

export const NavBarButtoms = () => {


    const { decodedToken, isExpired } = useAuthorization();

    const totalItemsInCart = useCartStore((state) => state.getTotalItems(decodedToken?.id ?? ''));

    return (
        <>
            {!isExpired ?
                <div className="flex items-center min-w-[200px] justify-between gap-8 mx-2">
                    <h1 className="mx-4" >Hola {decodedToken?.name}</h1>
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

                    <Link href={'/profile'} className="cursor-pointer hover:shadow-lg rounded-full" >
                        <CustomAvatar user={decodedToken!} />
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
