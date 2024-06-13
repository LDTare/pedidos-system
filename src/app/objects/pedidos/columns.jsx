"use client";
import { useRouter } from "next/navigation";
import BtnEliminar from "./btn_eliminar";
import ImprimirPDF from "./pdf";

export const columns = [
  {
    header: "ID",
    accessorKey: "id",
  },
  {
    header: "Nombre del cliente",
    accessorKey: "nombre",
  },
  {
    header: "Fecha de pedido",
    accessorKey: "fecha_pedido",
    cell: ({ row }) => {
      const fecha = row.original;
      if (fecha.fecha_pedido) {
        return new Date(fecha.fecha_pedido).toLocaleDateString();
      }
      return "Sin fecha";
    },
  },
  {
    header: "Fecha de entrega",
    accessorKey: "fecha_entrega",
    cell: ({ row }) => {
      const fecha = row.original;
      if (fecha.fecha_entrega) {
        return new Date(fecha.fecha_entrega).toLocaleDateString();
      }
      return "Pendiente de entrega";
    },
  },
  {
    header: "Total",
    accessorkey: "total",
    cell: ({ row }) => {
      const total = row.original;
      if (total.total) {
        return `Q.${total.total}`;
      }
      return "Sin total";
    },
  },
  {
    header: "Estado",
    accessorKey: "estado",
    cell: ({ row }) => {
      const estado = row.original;
      switch (estado.estado) {
        case "Pendiente":
          return (
            <span className=" bg-neutral-600 text-white rounded-full p-2">
              {estado.estado}
            </span>
          );
        case "Entregado":
          return (
            <span className="bg-black text-white rounded-full p-2">
              {estado.estado}
            </span>
          );
        case "Cancelado":
          return (
            <span className="bg-blue-950 text-white rounded-full p-2">
              {estado.estado}
            </span>
          );
        default:
          return "Sin estado";
      }
    },
  },
  {
    header: "Acciones",
    cell: ({ row }) => {
      const router = useRouter();
      const pedido = row.original;
      return (
        <div className="flex justify-center align-middle w-auto">
          <button
          onClick={() => router.push("/pages/pedidos/" + pedido.id)}
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
        >
          Ver detalles
        </button>

        <ImprimirPDF pedido={pedido} />

        <BtnEliminar pedido={pedido} />
        </div>
      );
    },
  },
];
