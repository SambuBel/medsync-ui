import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errorData = await res.json();
      return NextResponse.json({ error: errorData.message || "Error al registrar usuario" }, { status: res.status });
    }

    return NextResponse.json(await res.json());
  } catch (error) {
    return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
  }
}
