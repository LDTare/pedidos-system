import { db } from "@/lib/prisma";
import Link from "next/link";
import { columns } from "@/app/objects/pedidos/columns";
import { DataTable } from "@/app/objects/pedidos/data-table";
import { buttonVariants } from "@/components/ui/button";
import Contadores from "@/app/objects/pedidos/contador";

async function cargarPedidos(id_sucursal) {
  return await db.pedido.findMany({
    where: {
      sucursalId: parseInt(id_sucursal),
    },
    include: {
      sucursal: true,
      contenido: true,
    },
  });
}

export const dynamic = "force-dynamic";

async function pedidoDahsboard({ params }) {
  const pedidos = await cargarPedidos(params.id);
  const fecha = new Date();
  return (
    <section className="p-5 h-auto w-auto">
      <div className=" flex flex-col">
        <h1 className="font-bold text-3xl text-center p-3">
          Ordenes registradas
        </h1>
        <h2 className="font-light text-2xl text-center p-3">
          {pedidos[0]?.sucursal?.nombre}
        </h2>
      </div>
      <div className="flex flex-col container">
        <Contadores pedidos={pedidos} />
      </div>
      <div className="container mx-auto py-5">
        <div className="py-5">
          <Link
            className={buttonVariants({ variant: "outline" })}
            href={`/pages/pedidos/new?id=${params.id}`}
          >
            Registrar una nueva orden
          </Link>
        </div>
        <DataTable columns={columns} data={pedidos} />
      </div>
      <div className="py-5 container">
        <Link
          className={buttonVariants({ variant: "default" })}
          href="/pages/pedidos"
        >
          Regresar a sucursales
        </Link>
      </div>
    </section>
  );
}

export default pedidoDahsboard;
