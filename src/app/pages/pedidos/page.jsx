"use client";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

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

export default function PedidosPage() {
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
      loading: "Cargando informacion de sucursales...",
      success: "Sucursales cargadas correctamente",
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
    <main className="flex min-h-screen flex-col items-center justify-center border">
      <div className=" text-center font-light text-3xl">
        <p> LA PUNTADA DORADA</p>
        <Label>Sistema para la gestión de ordenes</Label>
      </div>
      <div className=" rounded-lg p-5 flex flex-col items-center justify-center">
        <Image
          className="rounded-2xl"
          src="/la-puntada-dorada.jpg"
          alt="La puntada Dorada"
          width={400}
          height={400}
        />
      </div>
      <div>
        <div className="text-center font-light text-3xl">
            <p> Sucursales</p>
        </div>
      <div className="p-5 flex w-full space-x-5 items-center justify-center">
        {sucursales.map((sucursal) => (
          <Card className="min-w-60 max-w-80" key={sucursal.id}>
            <CardHeader>
              <CardTitle>{sucursal.nombre}</CardTitle>
              <CardDescription>{sucursal.telefono}</CardDescription>
            </CardHeader>
            <CardContent>
              <p> {sucursal.direccion} </p>
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                onClick={() => {
                  router.push("/pages/pedidos/dashboard/" + sucursal.id);
                }}
              >
                Administrar sucursal
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      </div>
    </main>
  );
}
