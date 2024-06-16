import { FormikProps } from "formik";


export const validateFormikField = (name: string, formik: FormikProps<any>): boolean => {
    if (formik.touched[name] && formik.errors[name]) {
        return true;
    }
    return false;
}

export const validateFormikFieldMessage = (name: string, formik: FormikProps<any>): string | undefined => {
    if (formik.touched[name] && formik.errors[name]) {
        return formik.errors[name] as string;
    }
    return undefined;
}