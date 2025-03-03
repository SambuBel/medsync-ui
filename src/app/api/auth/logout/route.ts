import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "Logout exitoso" });

  // Eliminamos la cookie del token
  response.cookies.set("token", "", { expires: new Date(0), httpOnly: true });

  return response;
}
