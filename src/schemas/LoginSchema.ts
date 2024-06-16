import * as yup from 'yup';
import { PropsFormikLogin } from '@/interfaces/Auth';


export const LoginSchema = yup.object<PropsFormikLogin>().shape({
  email: yup.string().email().nullable().required('El correo es requerido'),
  password: yup.string().nullable().required('La contraseña es requerida'),
});