import { db } from "@/lib/prisma";
import Link from "next/link";
import { columns } from "@/app/objects/usuarios/columns";
import { DataTable } from "@/app/objects/usuarios/data-table";

async function cargarUsuarios() {
  return await db.user.findMany();
}

export const dynamic = "force-dynamic";

async function Usuarios_dashboard() {
    const usuarios = await cargarUsuarios();
    return (
        <section className="p-5 h-auto w-auto">
        <div className=" flex flex-col">
            <h1 className="font-bold text-3xl text-center p-3">
            Usuarios registrados
            </h1>
        </div>

        <div>
            <Link href="/pages/usuarios/new">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Registrar un nuevo usuario
            </button>
            </Link>
        </div>
        <div className="container mx-auto py-5">
            <DataTable columns={columns} data={usuarios} />
        </div>
        </section>
    );
    }

export default Usuarios_dashboard;