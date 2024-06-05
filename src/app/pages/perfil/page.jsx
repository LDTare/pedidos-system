"use client";
import { useRouter } from "next/navigation";
import { FrmUser } from "@/app/objects/usuarios/formulario";
import { Suspense } from "react";

function SearchBarFallback() {
  return <>placeholder</>
}

export default function Perfil() {
    return (
        <Suspense fallback={<SearchBarFallback />}>
        <div className="space-y-6">
        <h1 className="text-3xl font-bold">Perfil</h1>
        <p className="text-muted-foreground">
            Esta es la página de perfil del usuario
        </p>
        <FrmUser />
        </div>
        </Suspense>
    );
    }
    