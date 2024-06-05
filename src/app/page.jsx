"use client";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div>
        <Image
          className="rounded-2xl"
          src="/la-puntada-dorada.jpg"
          alt="La puntada Dorada"
          width={200}
          height={200}
        />
      </div>
      <div className="flex flex-col p-10 rounded mt-5 bg-slate-400/20 space-y-5">
        <p>Sistema para la gestión de ordenes de la puntada dorada</p>
        <Button
          variant="outline"
          onClick={() => {
            router.refresh();
            router.push("/pages/pedidos");
          }}
        >
          {" "}
          Iniciar sesión en el sistema
        </Button>
      </div>
      <Label className="p-10">&copy; La puntada dorada 2024 </Label>
    </main>
  );
}
