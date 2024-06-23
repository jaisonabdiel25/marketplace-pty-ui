'use client'
import { Input } from '@/components/ui/input'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Label } from "@/components/ui/label"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button'
import { validateFormikField, validateFormikFieldMessage } from '@/utils/validationFormik'
import { ProductResponse, PropsFormikProducts } from '@/interfaces/Products'
import { useServicesProductAction } from '@/hooks/useServicesProductAction'
import { GlobalResponse } from '@/interfaces/global'
import { CustomCardForm } from '@/components/Customs/CustomCardForm'
import { CustomAlert } from '@/components/Customs/CustomAlert'
import { useRouter } from 'next/navigation'

export const CreateProductFrom = () => {

    const router = useRouter();
    const { createProductApi } = useServicesProductAction();
    const [responsePost, setResponsePost] = useState<GlobalResponse<ProductResponse>>(null as unknown as GlobalResponse<ProductResponse>);

    const formik = useFormik<PropsFormikProducts>({
        initialValues: {
            name: '',
            description: '',
            price: 0,
            categoryId: '662bd8bc-94a4-4a49-9b96-df125afa26f4',
            images: []
        },
        onSubmit: async (values) => {
            const formData = new FormData();

            for (const file of values.images) {
                formData.append('file', file);
            }

            formData.append('name', values.name);
            formData.append('description', values.description);
            formData.append('price', values.price.toString());
            formData.append('categoryId', '662bd8bc-94a4-4a49-9b96-df125afa26f4');

            const result = await createProductApi(formData, 'POST');
            setResponsePost(result)

        }
    })
    return (
        <div className='flex justify-center w-full mt-20'>
            <CustomCardForm onAction={() => formik.handleSubmit()} onCancel={() => formik.resetForm()}>
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
                            <Select defaultValue='astro' value={formik.values.categoryId}>
                                <SelectTrigger id="framework">
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent position="popper">
                                    <SelectItem value="next">Next.js</SelectItem>
                                    <SelectItem value="sveltekit">SvelteKit</SelectItem>
                                    <SelectItem value="astro">Astro</SelectItem>
                                    <SelectItem value="nuxt">Nuxt.js</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className='grid w-full items-center gap-4'>
                            <Label htmlFor="images">Imagenes</Label>
                            <Input
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
                                accept='image/*'
                                error={validateFormikField("images", formik)}
                                errorMessage={validateFormikFieldMessage("imagimageses", formik)}
                            />
                        </div>
                    </div>
                </form>
                {responsePost && 
                <CustomAlert
                    message={'Producto creado con exito'}
                    action={() => router.push(`/product/${responsePost?.data?.id}`)}
                    textButon='Ver producto'
                    noTimeOut
                />}

            </CustomCardForm>

        </div>
    )
}
