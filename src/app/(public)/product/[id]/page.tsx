import { ProductDetail } from '@/components/productDetail/ProductDetail';
import { useServicesProduct } from '@/hooks/useServicesProduct';
import { ProductResponse } from '@/interfaces/Products';

const ProductPage = async ({ params }: { params: { id: string } }) => {
    const { id } = params;

    const { getProduct } = useServicesProduct<unknown, ProductResponse>();

    const product = await getProduct(id);


    return (
        <>
            {product && <ProductDetail product={product} />}
        </>
    )
}

export default ProductPage