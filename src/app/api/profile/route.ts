import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    return NextResponse.json({ error: "Error al obtener perfil" }, { status: 400 });
  }

  const userData = await res.json();
  return NextResponse.json(userData);
}
