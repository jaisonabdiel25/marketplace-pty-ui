import { ProductDetail } from '@/components/productDetail/ProductDetail';
import { ProductResponse } from '@/interfaces/Products';

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

const ProductPage = async ({ params }: { params: { id: string } }) => {
    const { id } = params;

    const product = await getProduct(id);

    return (
        <>
            {product && <ProductDetail product={product} />}
        </>
    )
}

export default ProductPage