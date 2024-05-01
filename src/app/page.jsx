"use client";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { buttonVariants } from "@/components/ui/button"
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className=" bg-slate-400 rounded-2xl text-slate-100 p-7 space-y-5 flex flex-col items-center justify-center">
        <Label className="font-bold text-3xl">
          Aria Flandre --- Proyecto 2024-005
        </Label>
        <Label className="text-lg"> Beta de sistema y pagina estatica </Label>
      </div>

      <Label className="m-5 font-light text-3xl">
        Bordados la puntada Dorada
      </Label>

      <div className=" rounded-lg p-5 flex flex-col bg-blue-950 items-center justify-center">
        <Image
          className="rounded-2xl"
          src="/la-puntada-dorada.jpg"
          alt="La puntada Dorada"
          width={400}
          height={400}
        />
        <div className="p-5 flex w-full space-x-5 items-center justify-center">
          <Card>
            <CardHeader>
              <CardTitle>La puntada Dorada</CardTitle>
              <CardDescription>
                San Francisco el Alto, Totonicapan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Sitio estatico</p>
            </CardContent>
            <CardFooter>
            <Link href={"#"} className={buttonVariants({ variant: "outline" })}>Ir al sitio estatico</Link> 
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>La puntada Dorada</CardTitle>
              <CardDescription>
                San Francisco el Alto, Totonicapan
              </CardDescription>

            </CardHeader>
            <CardContent>
              <p>Sistema de pedidos</p>
            </CardContent>
            <CardFooter>
            <Link href={"/pages/pedidos/dashboard"} className={buttonVariants({ variant: "outline" })}>Ir a la beta del sistema</Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  );
}
