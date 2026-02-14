import { readFile } from "fs/promises";
import path from "path";
import { NextRequest } from "next/server";

export const runtime = "nodejs";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ filename: string }> }
) {
  try {
    // ⚠️ Next 16: params harus di-await
    const { filename } = await context.params;

    const filePath = path.join(
      process.cwd(),
      "storage/uploads",
      filename
    );

    const fileBuffer = await readFile(filePath);

    const ext = filename.split(".").pop() ?? "";

    const mimeTypes: Record<string, string> = {
      png: "image/png",
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      webp: "image/webp",
      gif: "image/gif",
    };

    const contentType = mimeTypes[ext] || "application/octet-stream";

    return new Response(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Length": fileBuffer.length.toString(), // 🔴 ini kunci utama
        "Cache-Control": "public, max-age=31536000, immutable",
        "Content-Disposition": "inline",
        "Accept-Ranges": "bytes",
      },
    });

  } catch (error) {
    return new Response("File not found", { status: 404 });
  }
}
