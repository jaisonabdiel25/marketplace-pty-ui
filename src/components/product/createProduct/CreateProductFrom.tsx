'use client'
import { useFormik } from 'formik'
import React from 'react'

export const CreateProductFrom = () => {

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            price: 0,
            stock: 0,
            category: '',
            image: ''
        },
        onSubmit: async (values) => {
            console.log(values)
        }
    })
    return (
        <div>CreateProductFrom</div>
    )
}
