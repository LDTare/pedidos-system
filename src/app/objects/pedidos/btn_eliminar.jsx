"use client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function BtnEliminar({pedido}) {
  const router = useRouter();
  const id = pedido.id;

  async function eliminar() {
    const response = await fetch("/api/pedidos/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ estado: "Eliminado" }),
    });
    if (response.ok) {
      toast.success("Pedido eliminado");
      router.refresh();
    } else {
      toast.error("Error al eliminar el pedido");
    }
  }

  return (
    <Button
      onClick={() => {
        if (confirm("¿Estás seguro de eliminar este pedido?")) {
          eliminar();
        }
      }}
      className="bg-red-500 hover:bg-red-600 text-white"
    >
      Eliminar
    </Button>
  );
}
