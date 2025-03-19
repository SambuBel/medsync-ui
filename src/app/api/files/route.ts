import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const token = (await cookies()).get("token")?.value;
  console.log("LLEGO")
  if (!token) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  // 🔹 Leer el archivo del formulario
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No se ha enviado ningún archivo." }, { status: 400 });
  }

  // 🔹 Subir el archivo al backend
  const backendRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/files/upload-profile`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData, // Enviar el archivo tal como se recibió
  });

  if (!backendRes.ok) {
    const error = await backendRes.json();
    return NextResponse.json({ error: error.message || "Error al subir la imagen" }, { status: 400 });
  }

  const data = await backendRes.json();
  return NextResponse.json(data);
}
