"use client";
import { useRouter } from "next/navigation";

export const columns = [
    {
        header: "ID",
        accessorKey: "id",
    },
    {
        header: "Nombre",
        accessorKey: "name",
    },
    {
        header: "Email",
        accessorKey: "email",
    },
    {
        header: "Acciones",
        cell: ({ row }) => {
            const router = useRouter();
            const { id } = row.original;
            return (
                <div className="flex justify-center space-x-2">
                    <button
                        onClick={() => console.log("Editar", id) }
                        className="bg-primary-500 text-white px-4 py-1 rounded"
                    >
                        Editar
                    </button>
                    <button
                        onClick={() => router.push(`/pages/usuarios/${id}`)}
                        className="bg-neutral-600 text-white px-4 py-1 rounded"
                    >
                        Eliminar
                    </button>
                </div>
            );
        },
    }
];