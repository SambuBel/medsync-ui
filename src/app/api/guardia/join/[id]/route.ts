import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Obtener el token primero
    const cookie = req.headers.get("cookie") || "";
    const tokenRes = await fetch("http://localhost:3000/api/auth/token", {
      credentials: "include",
      headers: { cookie },
    });

    if (!tokenRes.ok) {
      throw new Error('Error al obtener el token');
    }

    const { token } = await tokenRes.json();
    const roomId = params.id; // Guardar el ID en una variable

    // Hacer la llamada al backend
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jitsi/join/${roomId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      console.error('Error response:', errorData);
      throw new Error(errorData.message || 'Error al unirse a la consulta');
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error completo:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Error al unirse a la consulta' },
      { status: 500 }
    );
  }
}
