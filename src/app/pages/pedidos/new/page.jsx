"use client";
import Formulario_Creacion from "@/app/objects/pedidos/frm_create";
import Formulario_Edit from "@/app/objects/pedidos/frm_edit";
import { useParams } from "next/navigation";
import { Suspense } from "react";


function SearchBarFallback() {
  return <>placeholder</>
}

function pedidoNew() {
  const params = useParams();
  return (
    <Suspense fallback={<SearchBarFallback />}>
    <section className="container mx-auto my-auto">
      {
        params.id ? <Formulario_Edit /> : <Formulario_Creacion />
      }
    </section>
    </Suspense>
  );
}

export default pedidoNew;
