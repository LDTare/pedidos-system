import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";

export async function GET(request, { params }){
    try {
        const pedidos = await db.pedido.findUnique({
            where: {
                id: request.params.id
            }
        });
        return NextResponse.json(pedidos);
    } catch (error) {
        return NextResponse.error(error);
    }
}

export async function PUT(request, { params }){
    try {
        const pedido = await db.pedido.update({
            where: {
                id: request.params.id
            },
            data: request.body
        });
        return NextResponse.json(pedido);
    } catch (error) {
        return NextResponse.error(error);
    }
}

export async function DELETE(request, { params }){
    try {
        const pedido = await db.pedido.delete({
            where: {
                id: request.params.id
            }
        });
        return NextResponse.json(pedido);
    } catch (error) {
        return NextResponse.error(error);
    }
}