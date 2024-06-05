import { NextResponse } from "next/server";
import * as argon2 from "argon2";
import { db } from "@/lib/prisma";

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
        data.password = await argon2.hash(data.password);
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