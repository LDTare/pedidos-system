"use client";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";

import { useState, useEffect } from "react";

export default function Contadores(pedido) {
    
    //Contador para el total de ganancias
    const [totalGanancias, setTotalGanancias] = useState(0);
    //Contador para el total de pedidos
    const [totalPedidos, setTotalPedidos] = useState(0);
    //Contador para el total de pedidos pendientes
    const [totalPendientes, setTotalPendientes] = useState(0);
    //Contador para el total de pedidos entregados
    const [totalEntregados, setTotalEntregados] = useState(0);
    //Contador para el total de pedidos cancelados
    const [totalCancelados, setTotalCancelados] = useState(0);

    useEffect(() => {
        let totalGanancias = 0;
        let totalPedidos = 0;
        let totalPendientes = 0;
        let totalEntregados = 0;
        let totalCancelados = 0;
        pedido.pedidos.forEach((pedido) => {
            if (pedido.estado === "Pendiente") {
                totalPendientes++;
            } else if (pedido.estado === "Entregado") {
                totalEntregados++;
            } else if (pedido.estado === "Cancelado") {
                totalCancelados++;
                totalGanancias += pedido.total;
                totalPedidos++;
            }
        });
        setTotalGanancias(totalGanancias);
        setTotalPedidos(totalPedidos);
        setTotalPendientes(totalPendientes);
        setTotalEntregados(totalEntregados);
        setTotalCancelados(totalCancelados);
    }, [pedido]);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Ganancias totales recaudadas </CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold"> Q. {totalGanancias.toFixed(2)} </div>
          <p className="text-xs text-muted-foreground">
            Generadas
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pedidos pendientes</CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold"> {totalPendientes} </div>
          <p className="text-xs text-muted-foreground">
            Registrados 
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pedidos entregados</CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <rect width="20" height="14" x="2" y="5" rx="2" />
            <path d="M2 10h20" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{ totalEntregados}</div>
          <p className="text-xs text-muted-foreground">Registrados</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pedidos cancelados</CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{ totalCancelados }</div>
          <p className="text-xs text-muted-foreground">Registrados</p>
        </CardContent>
      </Card>
    </div>
  );
}
