import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import bcrypt from 'bcrypt';

export async function GET( request, { params }){
    try {
       const user = await db.user.findUnique({
              where: {
                id: Number(params.id)
              }
         });
        return NextResponse.json(user);
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function PUT(request, { params }){
    const data = await request.json();

    //handle password hashing
    if(data.password){
        data.password = await bcrypt.hash(data.password, 10);
    }

    try {
        const user = await db.user.update({
            where: {
                id: Number(params.id)
            },
            data: {
                ...data,
            }
        });
        return NextResponse.json(user);
    } catch (error) {
        return NextResponse.error(error);
    }
}