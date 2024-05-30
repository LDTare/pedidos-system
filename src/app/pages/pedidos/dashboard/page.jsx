import { db } from "@/lib/prisma";
import Link from "next/link";
import { columns } from "@/app/objects/pedidos/columns";
import { DataTable } from "@/app/objects/pedidos/data-table";
import { buttonVariants } from "@/components/ui/button"

async function cargarPedidos() {
  return await db.pedido.findMany();
}

export const dynamic = "force-async";

async function pedidoDahsboard() {
  const pedidos = await cargarPedidos();
  return (
    <section className="container mx-auto py-5">
      <div className="p-5 border">
        <h1 className="font-bold text-3xl text-center p-3">Ordenes registradas</h1>
      </div>
      <div className="container mx-auto py-5 border">
      <div className="flex items-center justify-evenly">
        <Link
          className={buttonVariants({ variant: "default" })}
          href="/"
        >
          Regresar
        </Link>
        <Link
          className={buttonVariants({ variant: "default" })}
          href="/pages/pedidos/new"
        >
          Nuevo pedido
        </Link>
        </div>
        <DataTable columns={columns} data={pedidos} />
      </div>
    </section>
  );
}

export default pedidoDahsboard;
