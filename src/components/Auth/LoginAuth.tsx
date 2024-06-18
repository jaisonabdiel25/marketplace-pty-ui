"use client";

import Image from "next/image";
import { useState } from "react";
import { FormLogin } from "./FormLogin";
import { FormRegister } from "./FormRegister";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


enum Tab {
  Login = "login",
  Register = "register",
}

export const LoginAuth = () => {
  const [register, setRegister] = useState<Tab>(Tab.Login);

  return (
    <div className="h-screen flex justify-center items-center bg-gray-200">
      <div className="flex gap-20 shadow-2xl p-10 bg-white rounded-sm min-h-[500px]">
        <div className="flex justify-center items-center">
          <Image priority={false} src="./logo.svg" alt="logo" width={300} height={300} />
        </div>

        <Tabs defaultValue={register} className="flex flex-col">

          <div>
            <TabsList>
              <TabsTrigger
                onChange={() => setRegister(Tab.Login)}
                value={Tab.Login}
              >
                Iniciar sesión
              </TabsTrigger>
              <TabsTrigger
                onChange={() => setRegister(Tab.Register)}
                value={Tab.Register}
              >
                Registrase
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="flex justify-center items-center h-full">
            <TabsContent value={Tab.Login}>
              <FormLogin />
            </TabsContent>
            <TabsContent value={Tab.Register}>
              <FormRegister />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};
