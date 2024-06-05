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
                <div className="flex justify-center align-middle max-w-72">
                    <button
                        onClick={() => router.push("/pages/perfil?id=" + id)}
                        className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
                    >
                        Editar
                    </button>
                </div>
            );
        },
    }
];