import { PedidoFRM } from "@/app/objects/pedidos/formulario";
import Home from "@/app/objects/pedidos/frm_dinamic";
import Link from "next/link";

function pedidoNew() {
  return (
    <section className="container mx-auto my-auto">
      <Home />
    </section>
  );
}

export default pedidoNew;
