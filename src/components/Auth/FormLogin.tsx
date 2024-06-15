import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Login = async (email: string, password: string) => {
  const apiUrl = process.env.API_URL;
  const response = await fetch(`${apiUrl}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  }).then((response) => response.json());
  return response;
};

export const FormLogin = () => {
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement)
      .value;
    const response = await Login(email, password);

    console.log(response);
  };
  return (
    <div className="flex flex-col items-center justify-center  gap-5">
      <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight">
        Iniciar sesión
      </h1>
      <form className="flex flex-col">
        <Input
          className="mb-2"
          id={"email"}
          type="email"
          placeholder="Correo"
        />
        <Input
          className="mb-4"
          id={"password"}
          type="password"
          placeholder="Contraseña"
        />
        <Button
          onClick={(e) => {
            handleLogin(e);
          }}
        >
          Ingresar
        </Button>
      </form>
    </div>
  );
};
