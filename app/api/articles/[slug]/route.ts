import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;

    const article = await prisma.article.findUnique({
      where: { slug },
    });

    if (!article) {
      return NextResponse.json(
        { error: "Article not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(article);
  } catch (error) {
    console.error("GET ARTICLE ERROR:", error);

    return NextResponse.json(
      { error: "Failed to fetch article" },
      { status: 500 }
    );
  }
}