import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (body.firebaseUID) {
      // 🔹 Login con Firebase
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/firebase-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firebaseUID: body.firebaseUID }),
      });

      if (!res.ok) {
        // Si el usuario no existe en la DB, intentamos actualizar su UID
        console.warn("Usuario no encontrado en DB. Intentando actualizar UID...");
        const updateRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/update-firebase-uid`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: body.email,
            newFirebaseUID: body.firebaseUID,
          }),
        });

        if (!updateRes.ok) {
          return NextResponse.json({ error: "No se pudo actualizar el UID en la DB" }, { status: 400 });
        }
      }

      const data = await res.json();
      console.log("✅ Token recibido de Firebase login:", data.access_token);

      const response = NextResponse.json({ message: "Login exitoso con Firebase" });
      response.cookies.set("token", data.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });

      return response;
    }

    // 🔹 Login normal con email y contraseña
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: body.email, password: body.password }),
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Credenciales inválidas" }, { status: 401 });
    }

    const data = await res.json();
    console.log("✅ Token recibido:", data.access_token);

    const response = NextResponse.json({ message: "Login exitoso" });
    response.cookies.set("token", data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
  }
}
