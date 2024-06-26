import { CreateProductFrom } from "@/components/product/createProduct/CreateProductFrom";
import { useServicesProduct } from "@/hooks/useServicesProduct";
import { Category, ProductResponse } from "@/interfaces/Products";
import { GlobalResponse } from "@/interfaces/global";
import { redirect } from "next/navigation";

const getProduct = async (id: string): Promise<ProductResponse> => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const url = `${apiUrl}/products/${id}`

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => {
            if (response.ok) {
                return response.json()
            }
        })
        .catch((error) => {
            console.log(error)
        })
    return await response;
}

const getCategories = async (): Promise<GlobalResponse<Category[]>> => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const url = `${apiUrl}/categories`

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => {
            if (response.ok) {
                return response.json()
            }
        })
        .catch((error) => {
            console.log(error)
        })

    return await response;
}

export default async function EditPage({ params }: { params: { id: string } }) {
    const { id } = params;

    if(!id){
        redirect('/')
    }


    const product = await getProduct(id);

    const categories = await getCategories();


    return (
        <>
            <CreateProductFrom product={product} categories={categories.data}/>
        </>
    );
}