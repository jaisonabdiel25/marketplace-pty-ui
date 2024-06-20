import Image from "next/image"
import { Input } from "../ui/input"
import { NavBarButtoms } from "./NavBarButtoms"
import Link from "next/link"


export const NavBar = () => {

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

                    <button
                        className="block border-0 bg-transparent px-2 text-black/50 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:hidden"
                        type="button"
                        data-twe-collapse-init
                        data-twe-target="#navbarSupportedContent4"
                        aria-controls="navbarSupportedContent4"
                        aria-expanded="false"
                        aria-label="Toggle navigation">
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
                    </button>

                    <div
                        className="!visible mt-2 hidden flex-grow basis-[100%] items-center justify-between lg:mt-0 lg:!flex lg:basis-auto px-8"
                        id="navbarSupportedContent4"
                        data-twe-collapse-item>

                        <div className="w-full px-4">
                            <Input className="text-bold" placeholder="Buscar productos por nombre, descripción..." />
                        </div>

                        <NavBarButtoms />

                    </div>
                </div>
            </nav>
        </>
    )
}
