import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT (request) {
  const data = await request.json();
  const date = new Date();
  try {
    const pedido = await db.pedido.update({
      where: {
        id: parseInt(request.query.id),
      },
      data: {
        estado: data.estado,
        fecha_entrega: date,
      },
    });
    return NextResponse.json(pedido);
  } catch (error) {
    return NextResponse.error(error);
  }
}
