import { PropsFormikRegister } from '@/interfaces/Auth';
import * as yup from 'yup';

export const RegisterSchema = yup.object<PropsFormikRegister>().shape({
    name: yup.string().nullable().required('El nombre es requerido'),
    firstName: yup.string().nullable().required('El apellido es requerido'),
    email: yup.string().email().nullable().required('El correo es requerido'),
    password: yup.string().nullable().required('La contraseña es requerida'),
    confirmPassword: yup.string().nullable().required('La confirmación de la contraseña es requerida').oneOf([yup.ref('password')], 'Las contraseñas no coinciden')
})