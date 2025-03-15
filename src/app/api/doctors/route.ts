import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const specialty = url.searchParams.get("specialty");

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/doctors${specialty ? `?specialty=${specialty}` : ""}`);

    if (!res.ok) {
      return NextResponse.json({ error: "No se pudieron obtener los médicos" }, { status: res.status });
    }

    const doctors = await res.json();
    return NextResponse.json(doctors);
  } catch (error) {
    console.error("Error en API de médicos:", error);
    return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
  }
}
