


import { useAuthorization } from "@/hooks/useAuthorization";
import { Button } from "../ui/button";
import Link from "next/link";

export const NavBarButtoms = async () => {
    const { validToken } = useAuthorization();

    return (
        <>
            {validToken() ?
                <div className="flex items-center">
                    <Button
                        className="me-3 inline-block rounded px-2 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal"
                    >
                        Vender
                    </Button>
                </div>
                :
                <div className="flex items-center">
                    <Link href={'/login'}>
                        <Button className="me-3 inline-block rounded px-2 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal">
                            Iniciar sesión
                        </Button>
                    </Link>
                </div>
            }
        </>

    )
}
