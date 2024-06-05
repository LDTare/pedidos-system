import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";

export async function GET(){
    try {
        const pedidos = await db.pedido.findMany();
        return NextResponse.json(pedidos);
    } catch (error) {
        return NextResponse.error(error);
    }
}

export async function POST(request){
    const data = await request.json();
    try {
        const pedido = await db.contenido.createMany({
            data: data, skipDuplicates: true
        });
        return NextResponse.json(pedido);
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
