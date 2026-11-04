import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/prisma/prisma.connect";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  if (!name || !email || !password || password.length < 6) {
    return NextResponse.json(
      { error: "Name, email and a password of 6+ characters are required" },
      { status: 400 }
    );
  }

  const normalizedEmail = String(email).toLowerCase();
  const existing = await prisma.user.findUnique({ where: { email: normalizedEmail } });
  if (existing) {
    return NextResponse.json({ error: "Email already registered" }, { status: 409 });
  }

  const hashed = await bcrypt.hash(password, 12);
  await prisma.user.create({
    data: { name, email: normalizedEmail, password: hashed, provider: "credentials" },
  });

  return NextResponse.json({ message: "Registered" }, { status: 201 });
}