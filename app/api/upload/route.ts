import { verifyToken, getTokenFromHeader } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  // 🔒 cek token
  const token = getTokenFromHeader(req);
  const user = token && verifyToken(token);

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const fileExt = file.name.split(".").pop();
    const fileName = Date.now() + "." + fileExt;

    // 🔥 folder upload RUNTIME (bukan public!)
    const uploadDir = path.join(process.cwd(), "storage/uploads");
    await mkdir(uploadDir, { recursive: true });

    const uploadPath = path.join(uploadDir, fileName);
    await writeFile(uploadPath, buffer);

    const fileUrl = `/uploads/${fileName}`;

    return NextResponse.json({ url: fileUrl });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
