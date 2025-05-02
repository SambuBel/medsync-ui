import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const cookie = req.headers.get("cookie") || "";

  const tokenRes = await fetch("http://localhost:3000/api/auth/token", {
    credentials: "include",
    headers: { cookie },
  });

  const { token } = await tokenRes.json();

  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const backendRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/guardia/waiting`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await backendRes.json();
  return NextResponse.json(data, { status: backendRes.status });
}