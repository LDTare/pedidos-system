import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";

export async function GET(){
    try {
        const sucursales = await db.sucursal.findMany([]);
        return NextResponse.json(sucursales);
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function POST(request){
    const data = await request.json();
    try {
        const sucursal = await db.sucursales.create({
            data: {
                nombre: data.nombre,
                direccion: data.direccion,
                telefono: data.telefono
            }
        });
        return NextResponse.json(sucursal);
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}