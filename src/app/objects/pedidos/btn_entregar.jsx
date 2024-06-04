"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function BtnEntregar({ pedido }) {
    const router = useRouter();
  return (
    <Button
      className=" w-full"
      variant="delivery"
      onClick={async () => {
        const res = await fetch("/api/pedidos/" + pedido.id, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ estado: "Cancelado"}),
        });
        console.log(res.json());
        router.refresh();
        router.back();
      }}
    >
      Confirmar pago del pedido
    </Button>
  );
}
