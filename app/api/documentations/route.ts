import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


// GET ALL DOCUMENTATION
export async function GET() {
  const docs = await prisma.documentation.findMany({
    include: {
      images: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(docs);
}



// CREATE DOCUMENTATION + GALLERY
export async function POST(req: Request) {
  const body = await req.json();

  const doc = await prisma.documentation.create({
    data: {
      title: body.title,
      slug: body.title.toLowerCase().replace(/ /g, "-"),
      excerpt: body.excerpt,
      content: body.content,
      coverImage: body.coverImage,

      images: {
        create: body.images.map((img: string) => ({
          imageUrl: img,
        })),
      },
    },
    include: {
      images: true,
    },
  });

  return NextResponse.json(doc);
}
