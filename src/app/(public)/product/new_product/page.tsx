
import { CreateProductFrom } from '@/components/product/createProduct/CreateProductFrom'
import { useServicesProduct } from '@/hooks/useServicesProduct';

const Newproduct = async () => {

    const { getCategories } = useServicesProduct();

    const categories = await getCategories();

    return (
        <CreateProductFrom categories={categories.data} />
    )
}

export default Newproduct