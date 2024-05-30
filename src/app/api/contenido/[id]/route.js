import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET (request, { params }) {
  try {
   const contenido = await db.contenido.findMany({
      where: {
        pedidoId: Number(params.id),
      },
    });
    return NextResponse.json(contenido);
  } catch (error) {
    return NextResponse.error(error);
  }
}

export async function PUT (request, { params }) {
  const data = await request.json();
  console.log(data);
  try {
    for (const item of data) {
      await db.contenido.update({
        where: {
          id: item.id,
        },
        data: item,
      });
    }
    return NextResponse.json({ message: "Contenido actualizado" });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
