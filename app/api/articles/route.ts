import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { verifyToken, getTokenFromHeader } from "@/lib/auth";

// GET ALL ARTICLES (Public)
export async function GET() {
  try {
    const articles = await prisma.article.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(articles);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch articles" }, { status: 500 });
  }
}

// CREATE ARTICLE (Protected)
export async function POST(req: Request) {
  try {
    // 🔒 Verify JWT
    const token = getTokenFromHeader(req as any);
    const user = token && verifyToken(token);

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    if (!body.title || !body.content) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const slug = body.title
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-");

    const article = await prisma.article.create({
      data: {
        title: body.title,
        slug,
        excerpt: body.excerpt ?? "",
        content: body.content,
        image: body.image ?? "",
        category: body.category ?? "Umum",
      },
    });

    return NextResponse.json(article);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create article" }, { status: 500 });
  }
}