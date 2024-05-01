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

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className=" flex-col border p-5 rounded-md">
        <div className=" my-5 bg-black text-white max-w-xs w-full rounded-md p-2">
          <p className=" text-center"> Detalles del pedido </p>
        </div>
        <div className=" flex-1 max-w-xs space-y-5">
          <Card>
            <CardHeader>
              <CardTitle> Información del pedido </CardTitle>
              <CardDescription>
                <h1>Pedido - No.{pedido.id} </h1>
                <h2>Cliente: {pedido.nombre}</h2>
                <p>
                  Fecha de pedido: {pedido.fecha_pedido.toLocaleDateString()}
                </p>
                {pedido.fecha_entrega && (
                  <p>
                    Fecha de entrega:{" "}
                    {pedido.fecha_entrega.toLocaleDateString()}
                  </p>
                )}
                <p>Total: Q.{pedido.total}</p>
              </CardDescription>
            </CardHeader>
            <CardContent >
              <div className=" w-full">
              <h2>Productos</h2>
              <div className=" flex-1 w-ful">
                {pedido.contenido.map((producto) => (
                  <div
                    className=" text-sm space-x-5 p-1 my-1 border rounded-md w-full"
                    key={producto.id}
                  >
                    <p className=" font-bold" >Producto - {producto.producto}</p>
                    <p>
                      Cantidad: {producto.cantidad}
                    </p>
                    <p>
                      Precio: Q.{producto.precio_u}
                    </p>
                    <p>
                      Subtotal: Q.{producto.subtotal}
                    </p>
                  </div>
                ))}
              </div>
              </div>
            </CardContent>
            <CardFooter>
              <div className=" flex-col space-y-5">
                <ImprimirPDF pedido={pedido} />
                <Button className="w-full">
                  <Link href="/pages/pedidos/dashboard">
                    Regresar al inicio
                  </Link>
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
export default DetallesPedido;
