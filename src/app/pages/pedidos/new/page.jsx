"use client";
import Formulario_Creacion from "@/app/objects/pedidos/frm_create";
import Formulario_Edit from "@/app/objects/pedidos/frm_edit";
import { useParams } from "next/navigation";

function pedidoNew() {
  const params = useParams();
  return (
    <section className="container mx-auto my-auto">
      {
        params.id ? <Formulario_Edit /> : <Formulario_Creacion />
      }
    </section>
  );
}

export default pedidoNew;
