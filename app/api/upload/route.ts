import { verifyToken, getTokenFromHeader } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import sharp from "sharp";

export const runtime = "nodejs";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  // 🔒 Verify JWT
  const token = getTokenFromHeader(req);
  const user = token && verifyToken(token);

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    // ❌ No file
    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    // ❌ Not image
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "File harus berupa gambar" },
        { status: 400 }
      );
    }

    // ❌ Max size 5MB
    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "Ukuran file maksimal 5MB" },
        { status: 400 }
      );
    }

    // 📦 Convert ke buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 🧠 PROCESS IMAGE (resize + compress + webp)
    const processedImage = await sharp(buffer)
      .resize({
        width: 1200, // max width
        withoutEnlargement: true, // jangan upscale gambar kecil
      })
      .webp({
        quality: 75, // balance kualitas & size
      })
      .toBuffer();

    // 🏷️ Nama file baru (webp)
    const fileName = `${Date.now()}.webp`;

    // 🚀 Upload ke Supabase Storage
    const { error } = await supabase.storage
      .from("uploads")
      .upload(fileName, processedImage, {
        contentType: "image/webp",
        upsert: false,
      });

    if (error) {
      console.error("Supabase Upload Error:", error);
      return NextResponse.json(
        { error: "Upload failed" },
        { status: 500 }
      );
    }

    // 🔗 Ambil public URL
    const { data } = supabase.storage
      .from("uploads")
      .getPublicUrl(fileName);

    return NextResponse.json({
      url: data.publicUrl,
      message: "Upload berhasil",
    });

  } catch (err) {
    console.error("Upload Error:", err);
    return NextResponse.json(
      { error: "Upload failed" },
      { status: 500 }
    );
  }
}