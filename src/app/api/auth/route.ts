import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("🔹 [API AUTH] Body recibido:", body);

    if (body.firebaseUID) {
      // 🔹 Login con Firebase
      console.log("🔹 [API AUTH] Intentando login con Firebase UID:", body.firebaseUID);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/firebase-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firebaseUID: body.firebaseUID }),
      });

      console.log("🔹 [API AUTH] Respuesta de /auth/firebase-login:", res.status);

      if (!res.ok) {
        // Si el usuario no existe en la DB, intentamos actualizar su UID
        console.warn("⚠️ [API AUTH] Usuario no encontrado en DB. Intentando actualizar UID...");
        const updateRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/update-firebase-uid`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: body.email,
            newFirebaseUID: body.firebaseUID,
          }),
        });

        console.log("🔹 [API AUTH] Respuesta de /auth/update-firebase-uid:", updateRes.status);

        if (!updateRes.ok) {
          const updateError = await updateRes.text();
          console.error("❌ [API AUTH] Error actualizando UID:", updateError);
          return NextResponse.json({ error: "No se pudo actualizar el UID en la DB" }, { status: 400 });
        }
      }

      let data;
      try {
        data = await res.json();
      } catch (e) {
        console.error("❌ [API AUTH] Error parseando JSON de /auth/firebase-login:", e);
        return NextResponse.json({ error: "Error parseando respuesta de Firebase login" }, { status: 500 });
      }

      console.log("✅ [API AUTH] Token recibido de Firebase login:", data.access_token);

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
    console.log("🔹 [API AUTH] Intentando login normal con email:", body.email);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: body.email, password: body.password }),
    });

    console.log("🔹 [API AUTH] Respuesta de /auth/login:", res.status);

    if (!res.ok) {
      const loginError = await res.text();
      console.error("❌ [API AUTH] Error en login normal:", loginError);
      return NextResponse.json({ error: "Credenciales inválidas" }, { status: 401 });
    }

    let data;
    try {
      data = await res.json();
    } catch (e) {
      console.error("❌ [API AUTH] Error parseando JSON de /auth/login:", e);
      return NextResponse.json({ error: "Error parseando respuesta de login" }, { status: 500 });
    }

    console.log("✅ [API AUTH] Token recibido:", data.access_token);

    const response = NextResponse.json({ message: "Login exitoso" });
    response.cookies.set("token", data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } catch (e) {
    console.error("❌ [API AUTH] Error general en /api/auth:", e);
    return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
  }
}
