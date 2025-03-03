import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Credenciales inválidas" }, { status: 401 });
    }

    const data = await res.json();

    console.log("✅ Token recibido:", data.access_token);

    const response = NextResponse.json({ message: "Login exitoso" });

    // 🔥 Guardamos el token en cookies
    response.cookies.set("token", data.access_token, {
      httpOnly: true, // 🔐 No accesible por JavaScript del navegador
      secure: process.env.NODE_ENV === "production", // Solo HTTPS en producción
      maxAge: 60 * 60 * 24 * 7, // 7 días
      path: "/", // Disponible en toda la app
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
  }
}
