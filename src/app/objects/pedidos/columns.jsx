"use client";
import { useRouter } from "next/navigation";

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
  },
  {
    header: "Acciones",
    cell: ({ row }) => {
      const router = useRouter();
      const pedido = row.original;
      return (
        <button
          onClick={() => router.push("/pages/pedidos/" + pedido.id)}
          className="bg-blue-500 hover:bg-blue-700 text-white font py-2 px-4 rounded"
        >
          Ver detalles
        </button>
      );
    },
  },
];
