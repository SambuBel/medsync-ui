import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const cookie = req.headers.get("cookie") || "";

  const tokenRes = await fetch("http://localhost:3000/api/auth/token", {
    credentials: "include",
    headers: { cookie },
  });

  const { token } = await tokenRes.json();

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jitsi/waiting-consultations`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error('Error al obtener las consultas en espera');
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Error al obtener las consultas en espera' },
      { status: 500 }
    );
  }
}