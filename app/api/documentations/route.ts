import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { verifyToken, getTokenFromHeader } from "@/lib/auth";

// GET ALL DOCUMENTATION (Public)
export async function GET() {
  try {
    const docs = await prisma.documentation.findMany({
      include: { images: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(docs);
  } catch (error) {
    console.error("GET DOCUMENTATION ERROR:", error);
    return NextResponse.json(
      { error: "Failed to fetch documentation" },
      { status: 500 }
    );
  }
}

// CREATE DOCUMENTATION (Protected)
export async function POST(req: Request) {
  try {
    // 🔒 AUTH (STRICT)
    const token = getTokenFromHeader(req);

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const user = verifyToken(token);

    if (!user || !user.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();

    // ✅ VALIDASI INPUT
    if (!body.title || !body.content) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // ✅ GENERATE SLUG
    const slug = body.title
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-");

    // ✅ CEK SLUG DUPLIKAT
    const existing = await prisma.documentation.findUnique({
      where: { slug },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Slug already exists" },
        { status: 409 }
      );
    }

    // ✅ VALIDASI IMAGES (PASTIKAN ARRAY)
    const images = Array.isArray(body.images) ? body.images : [];

    const doc = await prisma.documentation.create({
      data: {
        title: body.title,
        slug,
        excerpt: body.excerpt ?? "",
        content: body.content,
        coverImage: body.coverImage ?? "",
        images: {
          create: images.map((img: string) => ({
            imageUrl: img,
          })),
        },
      },
      include: { images: true },
    });

    return NextResponse.json(doc);
  } catch (error) {
    console.error("CREATE DOCUMENTATION ERROR:", error);
    return NextResponse.json(
      { error: "Failed to create documentation" },
      { status: 500 }
    );
  }
}