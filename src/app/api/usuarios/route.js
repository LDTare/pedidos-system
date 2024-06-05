import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import * as argon2 from "argon2";

export async function GET() {
  try {
    const users = await db.user.findMany();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  const data = await request.json();

  try {
    //Verificar si el usuario ya existe
    const findUsername = await db.user.findUnique({
      where: {
        username: data.username,
      },
    });

    if (findUsername) {
      return NextResponse.json(
        { message: "El usuario ya está registrado" },
        { status: 400 }
      );
    }

    const findEmail = await db.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (findEmail) {
      return NextResponse.json(
        { message: "El correo ya está registrado" },
        { status: 400 }
      );
    }

    //Hash the password
    data.password = await argon2.hash(data.password);

    const user = await db.user.create({
      data: {
        name: data.name,
        username: data.username,
        email: data.email,
        password: data.password,
      },
    });
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
