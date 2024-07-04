'use client'

import { useEffect, useState } from "react"
import { CustomCardForm } from "../Customs/CustomCardForm"
import CustomLoading from "../Customs/CustomLoading"
import { useFormik } from "formik"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { UserInfo } from "@/interfaces/Auth"
import { validateFormikField, validateFormikFieldMessage } from "@/utils/validationFormik"
import { useServiceUserAction } from "@/hooks/useServiceUserAction"
import { UserFormikProps } from "@/interfaces/User"
import { useRouter } from "next/navigation"
import { CustomAlert } from "../Customs/CustomAlert"

interface Props {
    user: UserInfo

}
export const EditUser = (props: Props) => {

    const { user } = props

    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);

    const { updateUserApi, isSuccess, isError } = useServiceUserAction({ setIsLoading })

    const initialValues = (): UserFormikProps => {
        if (user) {
            return {
                id: user.id,
                name: user.name,
                firstName: user.firstName,
                email: user.email,
                active: user.active,
                phone: user.phone,
                img: {} as File,
                description: user?.description ?? ''
            }
        }

        return {
            id: '',
            name: '',
            firstName: '',
            email: '',
            active: false,
            phone: '',
            img: {} as File,
            description: ''
        }
    }

    const formik = useFormik<UserFormikProps>({
        initialValues: initialValues(),
        onSubmit: async (values) => {

            const formData = new FormData();


            formData.append('file', values.img ?? '');
            formData.append('name', values.name);
            formData.append('firstName', values.firstName);
            formData.append('description', values.description ?? '');
            formData.append('phone', values.phone);
            formData.append('email', values.email);

            await updateUserApi(formData);
        }
    })

    const validateImageLoad = (): boolean => {
        if (!!formik.values.img && formik.touched.img && !formik.values.id) {
            return true
        } else {
            return false
        }
    }

    useEffect(() => {
        if (isSuccess) {
            router.push('/profile')
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccess]);

    return (

        <div className='flex justify-center w-full mt-20'>
            <CustomLoading open={isLoading} />
            <CustomCardForm
                labelButton={'Actualizar'}
                onAction={() => formik.handleSubmit()}
                onCancel={() => formik.resetForm()} disabledAction={validateImageLoad()}
                description="Edita tu perfil de usuario"
                title={user.name + ' ' + user.firstName}

            >
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
                            <Label htmlFor="description">Apellido</Label>
                            <Input
                                className="mb-2"
                                placeholder="Apellido"
                                name="firstName"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.firstName}
                                error={validateFormikField("firstName", formik)}
                                errorMessage={validateFormikFieldMessage("firstName", formik)}
                            />
                        </div>
                        <div className='grid w-full items-center gap-4'>
                            <Label htmlFor="description">Correo</Label>
                            <Input
                                className="mb-2"
                                placeholder="Correo"
                                name="email"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                                error={validateFormikField("email", formik)}
                                errorMessage={validateFormikFieldMessage("email", formik)}
                                disabled={true}
                            />
                        </div>
                        <div className='grid w-full items-center gap-4'>
                            <Label htmlFor="price">Descripción</Label>
                            <Input
                                className="mb-2"
                                placeholder="Descripción"
                                name="description"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.description}
                                error={validateFormikField("description", formik)}
                                errorMessage={validateFormikFieldMessage("description", formik)}
                            />
                        </div>
                        <div className='grid w-full items-center gap-4'>
                            <Label htmlFor="description">Telefono</Label>
                            <Input
                                className="mb-2"
                                placeholder="Telefono"
                                name="phone"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.phone}
                                error={validateFormikField("phone", formik)}
                                errorMessage={validateFormikFieldMessage("phone", formik)}
                            />
                        </div>

                        <div className='grid w-full items-center gap-4'>
                            <Label htmlFor="images">Foto de perfil</Label>
                            <Input
                                disabled={false}
                                className="mb-2"
                                placeholder="Imagenes"
                                type='file'
                                name="images"
                                onChange={(e) => {
                                    const file = e.target.files?.[0]
                                    formik.setFieldValue("img", file)

                                }}
                                onBlur={formik.handleBlur}
                                accept=".jpg, .png, .jpeg"
                                error={validateImageLoad()}
                                errorMessage={"las imagenes son requeridas"}
                            />
                        </div>
                    </div>
                </form>

            </CustomCardForm>

            {isError && <CustomAlert
                message={'Ocurrio un error al actualizar los datos del usuario, contactar a soporte tecnico'}
                action={() => router.push(`/profile`)}
                textButon='Entendido'
                variant={'destructive'}
                noTimeOut
                buttonApply={true}
            />
            }
        </div>
    )
}
