'use client'

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export const NavBarButtoms = () => {

    const router = useRouter();
    return (
        <div className="flex items-center">
            <Button
                className="me-3 inline-block rounded px-2 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal"
                onClick={() => router.push('/login')}
            >
                Iniciar sesión
            </Button>
        </div>
    )
}
