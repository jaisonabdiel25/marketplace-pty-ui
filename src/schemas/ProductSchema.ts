import * as yup from 'yup';

import { PropsFormikProducts } from '@/interfaces/Products';


export const ProductSchema = yup.object<PropsFormikProducts>().shape({
    name: yup.string().nullable().required('El nombre es requerido'),
    description: yup.string().nullable().required('La descripción es requerida'),
    categoryId: yup.string().nullable().required('La categoria requerida'),
    price: yup.number().nullable().min(1, 'El precio debe ser mayor a 0').required('El precio es requerido'),
});
