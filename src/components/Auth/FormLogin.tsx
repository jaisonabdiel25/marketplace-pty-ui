import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PropsFormikLogin, ResponseAuth } from "@/interfaces/Auth";
import { LoginSchema } from "@/schemas/LoginSchema";
import { Loader2 } from "lucide-react";

import {
  validateFormikField,
  validateFormikFieldMessage,
} from "@/utils/validationFormik";
import { useFormik } from "formik";
import { useServices } from "@/hooks/useServices";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


export const FormLogin = () => {
  const router = useRouter();
  const [dataLogin, setDataLogin] = useState<ResponseAuth>(null as unknown as ResponseAuth);

  const { fetchLogin, isError, isLoading, isSuccess } = useServices<PropsFormikLogin, ResponseAuth>();

  const formik = useFormik<PropsFormikLogin>({
    initialValues: {
      email: "",
      password: "",

    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      const response = await fetchLogin(values);
      setDataLogin(response)
    },
  });

  useEffect(() => {
    if (isSuccess && dataLogin) {
      localStorage.setItem('token', dataLogin.token);
      router.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, dataLogin])

  return (
    <div className="flex flex-col items-center justify-center  gap-5">
      <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight">
        Iniciar sesión
      </h1>
      <div className="flex flex-col">
        <Input
          className="mb-2"
          type="email"
          placeholder="Correo"
          name="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          error={validateFormikField("email", formik)}
          errorMessage={validateFormikFieldMessage("email", formik)}
        />
        <Input
          className="mb-2"
          type="password"
          placeholder="Contraseña"
          name="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          error={validateFormikField("password", formik)}
          errorMessage={validateFormikFieldMessage("password", formik)}
        />
        <Button
          disabled={isLoading}
          onClick={() => {
            formik.handleSubmit();
          }}
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Registrarse
        </Button>
      </div>
    </div>
  );
};
