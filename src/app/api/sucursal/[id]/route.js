import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";

export async function GET(request, { params }){
    try {
        const sucursal = await db.sucursal.findUnique({
            where: {
                id: Number(params.id)
            }
        });
        return NextResponse.json(sucursal);
    } catch (error) {
        return NextResponse.error(error);
    }
}

export async function PUT(request, { params }){
    const data = await request.json();
    try {
        const sucursal = await db.sucursal.update({
            where: {
                id: Number(params.id)
            },
            data: {
                ...data,
            }
        });
        return NextResponse.json(sucursal);
    } catch (error) {
        return NextResponse.error(error);
    }
}

export async function DELETE(request, { params }){
    try {
        const sucursal = await db.sucursal.delete({
            where: {
                id: Number(params.id)
            }
        });
        return NextResponse.json(sucursal);
    } catch (error) {
        return NextResponse.error(error);
    }
}