import { readFile } from "fs/promises";
import path from "path";

export const runtime = "nodejs";

export async function GET(
  req: Request,
  { params }: { params: { filename: string } }
) {
  try {
    const filePath = path.join(
      process.cwd(),
      "storage/uploads",
      params.filename
    );

    const fileBuffer = await readFile(filePath);

    const ext = params.filename.split(".").pop() ?? "";

    const mimeTypes: Record<string, string> = {
      png: "image/png",
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      webp: "image/webp",
      gif: "image/gif",
    };

    const contentType = mimeTypes[ext] || "application/octet-stream";

    return new Response(fileBuffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000",
      },
    });
  } catch {
    return new Response("File not found", { status: 404 });
  }
}
