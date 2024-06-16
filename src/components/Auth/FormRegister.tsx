
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { validateFormikField, validateFormikFieldMessage, } from "@/utils/validationFormik";
import { useFormik } from "formik";
import { useServices } from "@/hooks/useServices";
import { PropsFormikRegister, ResponseAuth } from "@/interfaces/Auth";
import { RegisterSchema } from "@/schemas/RegisterSchema";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const FormRegister = () => {
  const router = useRouter();
  const [dataLogin, setDataLogin] = useState<ResponseAuth>(null as unknown as ResponseAuth);

  const { fetchRegister, isError, isLoading, isSuccess } = useServices<PropsFormikRegister, ResponseAuth>();

  const formik = useFormik<PropsFormikRegister>({
    initialValues: {
      name: "",
      firstName: "",
      email: "",
      password: "",
      confirmPassword: "",

    },
    validationSchema: RegisterSchema,
    onSubmit: async (values) => {
      const response = await fetchRegister(values);
      setDataLogin(response);
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
        Regístrate
      </h1>
      <div className="flex flex-col">
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
        <Input
          className="mb-2"
          type="password"
          placeholder="Confirmar constraseña"
          name="confirmPassword"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.confirmPassword}
          error={validateFormikField("confirmPassword", formik)}
          errorMessage={validateFormikFieldMessage("confirmPassword", formik)}
        />
        <Button
          disabled={isLoading}
          onClick={() => {
            formik.handleSubmit();
          }}
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Ingresar
        </Button>
      </div>
    </div>
  )
}
