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
      <div className=" flex gap-20 shadow-2xl p-10 bg-white rounded-sm">
        <div>
          <Image src="./logo.svg" alt="logo" width={300} height={300} />
        </div>

        <Tabs defaultValue={register}>
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
          <TabsContent value={Tab.Login}>
            <FormLogin />
          </TabsContent>
          <TabsContent value={Tab.Register}>
            <FormRegister />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
