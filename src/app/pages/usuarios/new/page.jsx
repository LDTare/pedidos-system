import { FrmUser } from "@/app/objects/usuarios/formulario";
import { Suspense } from "react";

function SearchBarFallback() {
  return <>placeholder</>
}

function usuarioNewPage() {
  return (
    <Suspense fallback={<SearchBarFallback />}>
    <div className=" min-h-screen flex flex-col justify-center  align-middle sm:py-12">
      <div className=" p-5">
        <h1 className="text-3xl font-bold text-center">Nuevo Usuario</h1>
        <p className="text-muted-foreground text-center">
          Esta es la página de creación de usuarios
        </p>
      </div>
      <div className=" mx-auto">
      <FrmUser />
      </div>
    </div>
    </Suspense>
  );
}

export default usuarioNewPage;