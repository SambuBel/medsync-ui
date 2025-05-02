import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const cookie = req.headers.get("cookie") || "";

    const tokenRes = await fetch("http://localhost:3000/api/auth/token", {
      credentials: "include",
      headers: { cookie },
    });

    const { token } = await tokenRes.json();

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const backendRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/jitsi/consultation/end`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    if (!backendRes.ok) {
      throw new Error('Error en la respuesta del backend');
    }

    const data = await backendRes.json();
    
    // Asegurarnos de que tenemos todos los datos necesarios
    if (!data.emergencyVisitId) {
      throw new Error('Datos de visita incompletos');
    }

    // Devolver solo los datos necesarios sin redirecciones
    return NextResponse.json({
      emergencyVisitId: data.emergencyVisitId,
      patientName: data.patientName,
      roomName: data.roomName
    });
  } catch (err) {
    console.error("[Guardia End] Error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
} 