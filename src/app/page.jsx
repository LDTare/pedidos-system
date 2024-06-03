"use client";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { buttonVariants } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import { guardarSucursal } from "./utils/sucursal";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useEffect, useState } from "react";

import { toast } from "sonner";

export default function Home() {
  const [error, setError] = useState(null);
  const [sucursales, setSucursales] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const response = fetch("/api/sucursal", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    toast.promise(response, {
      loading: "Cargando...",
      success: "Sucursales cargada",
      error: "Error al cargar contenido",
    });

    const fetchSucursal = async () => {
      const res = await response;
      const data = await res.json();

      if (res.ok) setSucursales(data);
      else setError(data.message);
    };
    fetchSucursal();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className=" bg-slate-400 rounded-2xl text-slate-100 p-7 space-y-5 flex flex-col items-center justify-center">
        <Label className="font-bold text-3xl">
          Aria Flandre --- Proyecto 2024-005
        </Label>
        <Label className="text-lg"> Beta de sistema y pagina estatica </Label>
      </div>

      <Label className="m-5 font-light text-3xl">
        Bordados la puntada Dorada
      </Label>

      <div className=" rounded-lg p-5 flex flex-col bg-blue-950 items-center justify-center">
        <Image
          className="rounded-2xl"
          src="/la-puntada-dorada.jpg"
          alt="La puntada Dorada"
          width={400}
          height={400}
        />
        <div className="p-5 flex w-full space-x-5 items-center justify-center">
          {
            sucursales.map((sucursal) => (
              <Card key={sucursal.id}>
                <CardHeader>
                  <CardTitle>{sucursal.nombre}</CardTitle>
                  <CardDescription>{sucursal.direccion}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p> {sucursal.descripcion} </p>
                </CardContent>
                <CardFooter>
                  <Button
                    className={buttonVariants({ variant: "default" })}
                    onClick={() => {
                      guardarSucursal(sucursal);
                      router.push("/pages/pedidos/dashboard/" + sucursal.id);
                    }}
                  >
                    Ver
                  </Button>
                </CardFooter>
              </Card>
            ))
          }
        </div>
      </div>
    </main>
  );
}
