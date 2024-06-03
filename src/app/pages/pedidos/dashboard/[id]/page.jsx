import { db } from "@/lib/prisma";
import Link from "next/link";
import { columns } from "@/app/objects/pedidos/columns";
import { DataTable } from "@/app/objects/pedidos/data-table";
import { buttonVariants } from "@/components/ui/button";

async function cargarPedidos(id_sucursal) {
  return await db.pedido.findMany({
    where: {
      sucursalId: parseInt(id_sucursal),
    },
  });
}

export const dynamic = "force-dynamic";

async function pedidoDahsboard({ params }) {
  const pedidos = await cargarPedidos(params.id);
  return (
    <section className="p-5 h-auto w-auto">
      <div className="p-5 border">
        <h1 className="font-bold text-3xl text-center p-3">Ordenes registradas</h1>
      </div>
      <div className="container mx-auto py-5">
      <div className="flex items-center justify-evenly">
        <Link
          className={buttonVariants({ variant: "default" })}
          href="/"
        >
          Regresar
        </Link>
        <Link
          className={buttonVariants({ variant: "default" })}
          href={`/pages/pedidos/new?id=${params.id}`}
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
