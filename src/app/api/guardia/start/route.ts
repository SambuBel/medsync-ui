import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    console.log("ALO")
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
      `${process.env.NEXT_PUBLIC_API_URL}/jitsi/guardia-start`,
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

    return NextResponse.json(data, { status: backendRes.status });
  } catch (err) {
    console.error("[Guardia Start] Error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
