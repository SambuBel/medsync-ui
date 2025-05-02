import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { consultationId: string } }
) {
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
      `${process.env.NEXT_PUBLIC_API_URL}/consultations/${params.consultationId}/notes`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    const data = await backendRes.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("[Clinical Notes] Error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}