"use client"
import Link from "next/link"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetDescription, SheetTitle, SheetFooter, SheetClose } from "../ui/sheet"
import { IoCloseOutline, IoLogInOutline, IoLogOutOutline, IoPersonOutline, IoSearchOutline, IoTicketOutline } from "react-icons/io5"
import { useEffect, useMemo, useState } from "react"

import { useUserStore } from "@/store/user.store"
import { jwtDecode, JwtPayload } from "jwt-decode";
import { UserInfo } from "@/interfaces/Auth"
import clsx from "clsx"
import { useAuthorization } from "@/hooks/useAuthorization"

type SHEET_SIDES = 'top' | "right" | "bottom" | "left"

export type customJwtPayload = JwtPayload & { data: UserInfo };

interface Props {
    side: SHEET_SIDES
    className?: string;
}
export function SheetSide(props: Props) {

    const [open, setOpen] = useState(false);

    const { isExpired, resetAuth } = useAuthorization();


    const { side, className } = props;
    return (
        <div className={`grid grid-cols-2 gap-2 ${className}`}>
            <Sheet key={side} open={open}  >
                <SheetTrigger asChild onClick={() => setOpen(!open)}>
                    <span
                        className="[&>svg]:w-7 [&>svg]:stroke-black/50 dark:[&>svg]:stroke-neutral-200">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor">
                            <path
                                d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                            />
                        </svg>
                    </span>
                </SheetTrigger>
                <SheetContent side={side} onClick={() => setOpen(!open)} >
                    <SheetHeader>
                        <SheetTitle>Edit profile</SheetTitle>
                    </SheetHeader>
                    <nav
                        className={clsx(
                            "fixed p-5 right-0 top-0 w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300",
                            {
                                "translate-x-full": !open,
                            }
                        )}
                    >
                        <IoCloseOutline
                            size={50}
                            className="absolute top-5 right-5 cursor-pointer"
                            onClick={() => setOpen(false)}
                        />

                        {/* Menú */}

                        {!isExpired && (
                            <>
                                <Link
                                    href="/profile"
                                    onClick={() => setOpen(false)}
                                    className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
                                >
                                    <IoPersonOutline size={30} />
                                    <span className="ml-3 text-xl">Perfil</span>
                                </Link>

                                <Link
                                    href="/orders"
                                    onClick={() => setOpen(false)}
                                    className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
                                >
                                    <IoTicketOutline size={30} />
                                    <span className="ml-3 text-xl">Ordenes</span>
                                </Link>
                            </>
                        )}

                        {!isExpired && (
                            <button
                                className="flex w-full items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
                                onClick={() => resetAuth()}
                            >
                                <IoLogOutOutline size={30} />
                                <span className="ml-3 text-xl">Salir</span>
                            </button>
                        )}

                        {isExpired && (
                            <Link
                                href="/login"
                                className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
                                onClick={() => setOpen(false)}
                            >
                                <IoLogInOutline size={30} />
                                <span className="ml-3 text-xl">Ingresar</span>
                            </Link>
                        )}

                    </nav>
                    <SheetFooter>
                        <SheetClose asChild>
                            <Button type="submit">Save changes</Button>
                        </SheetClose>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </div>
    )
}
