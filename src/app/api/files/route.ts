import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { FileType } from "@/utils/constants/FileType";

export async function POST(req: Request) {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No se ha enviado ningún archivo." }, { status: 400 });
  }

  // ✨ Agregamos el tipo de archivo
  formData.append("fileType", FileType.PROFILE_IMAGE);

  const backendRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/files/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!backendRes.ok) {
    const error = await backendRes.json();
    return NextResponse.json({ error: error.message || "Error al subir la imagen" }, { status: 400 });
  }

  const data = await backendRes.json();
  return NextResponse.json(data);
}
