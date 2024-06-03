import { db } from "@/lib/prisma";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ImprimirPDF from "@/app/objects/pedidos/pdf";
import { BtnEntregar } from "@/app/objects/pedidos/btn_entregar";
import { BtnPreciosIng } from "@/app/objects/pedidos/btn_preciosIng"; 
import BtnRegresar from "@/app/objects/pedidos/btn_regresar";

async function getPedido(id) {
  const pedido = await db.pedido.findUnique({
    where: {
      id: parseInt(id),
    },
    include: {
      contenido: true,
    },
  });
  return pedido;
}

async function DetallesPedido({ params }) {
  const pedido = await getPedido(params.id);
  const fecha_pedido = new Date(pedido.fecha_pedido);
  const fecha_entrega = new Date(pedido.fecha_entrega);

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className=" flex-col max-w-2xl border p-5 rounded-md">
        <div className=" my-5 w-full rounded-md p-2">
          <p className="text-center font-bold text-2xl">Detalles del pedido </p>
        </div>
       <div className=" font-medium mb-5">
       <p>Cliente: {pedido.nombre}</p>
        <p>Fecha del pedido: {fecha_pedido.toLocaleDateString()}</p>
        <p>
          Fecha de entrega :{" "}
          {fecha_entrega.getFullYear() <= 1970
            ? "Pendiente"
            : fecha_entrega.toLocaleDateString()}
        </p>
       </div>
        <div className=" flex-1 space-y-5">
          <Card>
            <CardHeader>
              <CardTitle>
                <p className="text-xl font-bold">Pedido N° {pedido.id}</p>
              </CardTitle>
              <CardDescription>
                <p className="text-lg">Estado: {pedido.estado}</p>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <table className="w-full border rounded-md">
                <thead>
                  <tr className=" bg-slate-400">
                    <th className="text-left px-5">Producto</th>
                    <th className="text-right px-1">Cantidad</th>
                    <th className="text-right px-1">Precio</th>
                    <th className="text-right px-1">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {pedido.contenido.map((item) => (
                    <tr
                      className="border hover:bg-gray-400/80 cursor-default"
                      key={item.id}
                    >
                      <td className=" px-5">{item.producto}</td>
                      <td className=" text-center border-dotted border">
                        {item.cantidad ? item.cantidad : "Sin cantidad"}
                      </td>

                      <td className="text-center border-dotted border">
                        {item.precio_u ? item.precio_u : "Sin precio"}
                      </td>

                      <td className="text-center border-dotted border">
                        {item.subtotal ? item.subtotal : "Sin subtotal"}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className=" bg-slate-400">
                    <td colSpan="3" className="text-left font-bold px-5">
                      Total
                    </td>
                    <td className="text-center font-bold border">
                      {pedido.contenido.reduce(
                        (acc, item) => acc + item.cantidad * item.precio_u,
                        0
                      )}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </CardContent>
            <CardFooter>
              <div className="flex justify-between space-x-5">
                {pedido.estado === "Pendiente" ? (
                  <BtnPreciosIng pedido={pedido} />
                ) : null}

                {pedido.estado === "Entregado" ? (
                  <BtnEntregar pedido={pedido} />
                ) : null}
                
                <ImprimirPDF pedido={pedido} />

              </div>
            </CardFooter>
          </Card>

          <div className="mt-2">
            <BtnRegresar />
          </div>
        </div>
      </div>
    </div>
  );
}
export default DetallesPedido;
