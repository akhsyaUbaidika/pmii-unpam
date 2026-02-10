import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


// GET ALL ARTICLES
export async function GET() {
  const articles = await prisma.article.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(articles);
}


// CREATE ARTICLE
export async function POST(req: Request) {
  const body = await req.json();

  const article = await prisma.article.create({
    data: {
      title: body.title,
      slug: body.title.toLowerCase().replace(/ /g, "-"),
      excerpt: body.excerpt,
      content: body.content,
      image: body.image,
      category: body.category,
    },
  });

  return NextResponse.json(article);
}
