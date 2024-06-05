import { db } from "@/lib/prisma";
import Link from "next/link";
import { columns } from "@/app/objects/usuarios/columns";
import { DataTable } from "@/app/objects/usuarios/data-table";
import { buttonVariants } from "@/components/ui/button";

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

        <div className="container mx-auto py-5">
            <div className="py-5">
            <Link
            className={buttonVariants({ variant: "outline" })}
                href={`/pages/usuarios/new`}
            >
                Registrar un nuevo usuario
            </Link>
            </div>
        </div>
        <div className="container mx-auto py-5">
            <DataTable columns={columns} data={usuarios} />
        </div>
        </section>
    );
    }

export default Usuarios_dashboard;