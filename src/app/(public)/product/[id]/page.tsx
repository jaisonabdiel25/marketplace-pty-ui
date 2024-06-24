import { ProductDetail } from '@/components/productDetail/ProductDetail';
import { useServicesProduct } from '@/hooks/useServicesProduct';
import { ProductResponse } from '@/interfaces/Products';

const ProductPage = async ({ params }: { params: { id: string } }) => {
    const { id } = params;

    const { getProduct} = useServicesProduct();

    const product = await getProduct<ProductResponse>(id);
    
    return (
        <>
            {product && <ProductDetail product={product} />}
        </>
    )
}

export default ProductPage