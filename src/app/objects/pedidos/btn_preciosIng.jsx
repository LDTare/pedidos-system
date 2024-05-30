"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function BtnPreciosIng({ pedido }) {
    const router = useRouter();
  return (
    <Button
      className=" w-full"
      variant="outline"
      onClick={
        () => {
          router.push("/pages/pedidos/editar/" + pedido.id );
        }
      }
    >
      Ingresar precios
    </Button>
  );
}
