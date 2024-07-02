'use client'
import { useFormik } from 'formik'
import React, { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'

import { Label } from "@/components/ui/label"
import { Input } from '@/components/ui/input'
import { validateFormikField, validateFormikFieldMessage } from '@/utils/validationFormik'
import { Category, ProductResponse, PropsFormikProducts, RequestProduct } from '@/interfaces/Products'
import { useServicesProductAction } from '@/hooks/useServicesProductAction'
import { CustomCardForm } from '@/components/Customs/CustomCardForm'
import { CustomAlert } from '@/components/Customs/CustomAlert'
import { ProductSchema } from '@/schemas/ProductSchema'
import { CustomSelect } from '@/components/Customs/CustomSelect'
import CustomLoading from '@/components/Customs/CustomLoading'

interface Props {
    categories: Category[]
    product?: ProductResponse
}

export const CreateProductFrom = (props: Props) => {

    const { product, categories } = props
    const [responsePost, setResponsePost] = useState<ProductResponse>(null as unknown as ProductResponse);
    const [isLoading, setIsLoading] = useState(false);

    const selectCategories = useMemo(() => {
        return categories?.map(item => ({
            id: item.id,
            label: item.description,
            value: item
        }))
    }, [categories])

    const router = useRouter();
    const { createProductApi, updateProductApi, message, isError, isSuccess } = useServicesProductAction({ setIsLoading });


    const initialValues = (): PropsFormikProducts => {

        if (product) {
            return {
                id: product.id,
                name: product.name,
                description: product.description,
                categoryId: product.category!.id,
                price: Number(product.price),
                images: {}
            }
        }
        return {
            id: '',
            name: '',
            description: '',
            price: 0,
            categoryId: '',
            images: {}
        }

    }

    const formik = useFormik<PropsFormikProducts>({
        initialValues: initialValues(),
        validationSchema: ProductSchema,
        onSubmit: async (values) => {

            if (formik.values.id) {

                const request: RequestProduct = {
                    name: values.name,
                    description: values.description,
                    price: values.price,
                    categoryId: values.categoryId
                }

                await updateProductApi(product?.id ?? responsePost.id, request, 'PATCH');

            } else {
                const formData = new FormData();

                for (const file of values.images as File[]) {
                    formData.append('file', file);
                }
                formData.append('name', values.name);
                formData.append('description', values.description);
                formData.append('price', values.price.toString());
                formData.append('categoryId', values.categoryId);

                const result = await createProductApi(formData, 'POST');
                setResponsePost(result.data);
                formik.setFieldValue('id', result.data.id);
            }

        }
    });

    const validateImageLoad = (): boolean => {
        if (Object.keys(formik.values.images).length == 0 && formik.touched.images && !formik.values.id) {
            return true
        } else {
            return false
        }
    }

    useEffect(() => {
        if (isSuccess && (responsePost)) {
            router.push(`/product/${responsePost?.id}`)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccess, responsePost])


    return (
        <div className='flex justify-center w-full mt-20'>
            <CustomLoading open={isLoading} />
            <CustomCardForm labelButton={formik.values.id ? 'Actualizar' : 'Crear'} onAction={() => formik.handleSubmit()} onCancel={() => formik.resetForm()} disabledAction={validateImageLoad()}>
                <form>
                    <div className="grid w-full items-center gap-4">
                        <div className='flex gap-4 my-2'>
                            <div className='grid w-full items-center gap-4'>
                                <Label htmlFor="name">Nombre</Label>
                                <Input
                                    className="mb-2"
                                    placeholder="Nombre"
                                    name="name"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.name}
                                    error={validateFormikField("name", formik)}
                                    errorMessage={validateFormikFieldMessage("name", formik)}
                                />
                            </div>
                        </div>
                        <div className='grid w-full items-center gap-4'>
                            <Label htmlFor="description">Descriptión</Label>
                            <Input
                                className="mb-2"
                                placeholder="Description"
                                name="description"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.description}
                                error={validateFormikField("description", formik)}
                                errorMessage={validateFormikFieldMessage("description", formik)}
                            />
                        </div>
                        <div className='grid w-full items-center gap-4'>
                            <Label htmlFor="price">Precio</Label>
                            <Input
                                className="mb-2"
                                placeholder="Price"
                                type='number'
                                name="price"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.price}
                                error={validateFormikField("price", formik)}
                                errorMessage={validateFormikFieldMessage("price", formik)}
                            />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="categoryId">Categoría</Label>
                            <CustomSelect
                                name={'categoryId'}
                                options={selectCategories}
                                value={formik.values.categoryId}
                                onChange={(value: string) => formik.setFieldValue('categoryId', value)}
                            />
                        </div>
                        <div className='grid w-full items-center gap-4'>
                            <Label htmlFor="images">Imagenes</Label>
                            <Input
                                disabled={!!formik.values.id}
                                className="mb-2"
                                placeholder="Imagenes"
                                type='file'
                                name="images"
                                onChange={(e) => {
                                    const files = e.target.files
                                    formik.setFieldValue("images", files)

                                }}
                                onBlur={formik.handleBlur}
                                multiple
                                accept=".jpg, .png, .jpeg"
                                error={validateImageLoad()}
                                errorMessage={"las imagenes son requeridas"}
                            />
                        </div>
                    </div>
                </form>
                {isSuccess && (<CustomAlert
                    message={message}
                    action={() => router.push(`/product/${formik.values.id}`)}
                    textButon='Ver producto'
                    variant={isError ? 'destructive' : 'success'}
                    noTimeOut
                    buttonApply={!isError}
                />)}

            </CustomCardForm>

        </div>
    )
}
