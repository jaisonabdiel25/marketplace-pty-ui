import Image from "next/image"
import { Input } from "../ui/input"
import { NavBarButtoms } from "./NavBarButtoms"
import Link from "next/link"
import { cookies } from 'next/headers';
import { SheetSide } from "../Customs/CustomSheetSide";


export const NavBar = () => {

    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;

    return (
        <>
            <nav
                className="relative flex w-full flex-wrap items-center justify-between bg-white shadow-[0_15px_60px_-35px_rgba(0,0,0,0.3)] dark:bg-neutral-700 "
                data-twe-navbar-ref>
                <div className="flex w-full flex-wrap items-center justify-between px-3">

                    <Link className="mx-2 my-1 flex items-center lg:mb-0 lg:mt-0 px-8" href={`/dashboard`}>
                        <div>
                            <Image src="/logo.svg" alt="logo" width={100} height={100} />
                        </div>
                    </Link>

                    <div className="block border-0 bg-transparent px-2 text-black/50 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:hidden">

                        <SheetSide side={'right'} />
                    </div>

                    <div
                        className="!visible mt-2 hidden flex-grow basis-[100%] items-center justify-between lg:mt-0 lg:!flex lg:basis-auto px-8"
                        id="navbarSupportedContent4"
                        data-twe-collapse-item>

                        <div className="flex-1">
                            <Input className="text-bold" placeholder="Buscar productos por nombre, descripción..." />
                        </div>
                        <div className="px-2">
                            <NavBarButtoms token={token} />
                        </div>
                    </div>

                </div>
            </nav>
        </>
    )
}
