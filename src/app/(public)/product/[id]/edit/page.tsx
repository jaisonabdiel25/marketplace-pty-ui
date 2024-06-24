import { CreateProductFrom } from "@/components/product/createProduct/CreateProductFrom";
import { useServicesProduct } from "@/hooks/useServicesProduct";
import { ProductResponse } from "@/interfaces/Products";
import { redirect } from "next/navigation";

export default async function EditPage({ params }: { params: { id: string } }) {
    const { id } = params;

    if(!id){
        redirect('/')
    }

    const { getProduct, getCategories } = useServicesProduct();

    const product = await getProduct<ProductResponse>(id);

    const categories = await getCategories();


    return (
        <>
            <CreateProductFrom product={product} categories={categories.data}/>
        </>
    );
}