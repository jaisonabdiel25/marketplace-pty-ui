
import { CreateProductFrom } from '@/components/product/createProduct/CreateProductFrom'
import { Category } from '@/interfaces/Products';
import { GlobalResponse } from '@/interfaces/global';

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

const Newproduct = async () => {

    const categories = await getCategories();

    return (
        <CreateProductFrom categories={categories.data} />
    )
}

export default Newproduct