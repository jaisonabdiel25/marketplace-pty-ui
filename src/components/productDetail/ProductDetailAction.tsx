'use client';
import Cookies from 'js-cookie';
import { jwtDecode, JwtPayload } from "jwt-decode";
import { useMemo } from 'react';

import { ProductResponse } from "@/interfaces/Products"
import { Button } from "../ui/button"
import { UserInfo } from '@/interfaces/Auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Props {
    product: ProductResponse
}

export type customJwtPayload = JwtPayload & { data: UserInfo };

const ProductDetailAction = ({ product }: Props) => {

    const router = useRouter()

    const token = Cookies.get('token')

    const isAuth = useMemo(() => {
        if (!token) return false;
        const decodedToken = jwtDecode<customJwtPayload>(token);

        const currentDate = new Date();
        // JWT exp is in seconds
        if (decodedToken.exp && decodedToken.exp * 1000 < currentDate.getTime()) {
            return false;
        } else {
            return true;
        }
    }, [token]);

    const tokenDecoded = useMemo((): UserInfo => {

        if (!token) return null as unknown as UserInfo;
        const decodedToken = jwtDecode<customJwtPayload>(token);
        return decodedToken.data

    }, [token])

    const renderButtonSold = () => {
        return (
            product.createBy?.id === tokenDecoded?.id
            
                ? <Button onClick={() => router.push(`/product/${product.id}/edit`)} className='mt-4 w-full'>Editar</Button>
                : <Button className='mt-4 w-full'>Comprar</Button>
        )
    }

    return (
        <div className='flex justify-center'>
            <div className='flex flex-col justify-between items-start  rounded-md  min-w-[450px] xl:min-w-[500px] max-w-md px-4' >
                <div className='my-8'>
                    <h1 className="text-3xl font-semibold my-2 camell">{product.name?.toUpperCase()}</h1>
                    <h2 className='font-light italic'>Categoria de {product.category?.description}</h2>
                    <h2 className="text-xl my-2 font-extrabold">${product.price}</h2>
                    <p className="text-sm my-2">{product.description}</p>
                </div>
                {isAuth
                    ?
                    renderButtonSold()
                    :
                    <span className='font-light'>Para comprar este producto debes iniciar sesión</span>}

            </div>
        </div>
    )
}

export default ProductDetailAction;
