import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const { doctorId, date, specialty } = await req.json();
    const token = (await cookies()).get("token")?.value;
    console.log("Token de appointmet :", token)
    if (!token) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }
    
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/appointments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // ✅ Usa el token desde las cookies
      },
      body: JSON.stringify({ doctorId, date, specialty }),
      credentials: 'include'
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Error al agendar el turno" }, { status: res.status });
    }

    return NextResponse.json(await res.json());
  } catch (error) {
    return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const token = (await cookies()).get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/appointments`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, // ✅ Usa el token desde las cookies
      },
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Error al obtener los turnos" }, { status: res.status });
    }

    return NextResponse.json(await res.json());
  } catch (error) {
    return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const token = (await cookies()).get("token")?.value;
    const { id, status } = await req.json();

    if (!token) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/appointments/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Error al cancelar el turno" }, { status: res.status });
    }

    return NextResponse.json(await res.json());
  } catch (error) {
    return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
  }
}
