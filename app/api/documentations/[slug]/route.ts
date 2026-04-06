import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const doc = await prisma.documentation.findUnique({
      where: { slug: params.slug },
      include: { images: true },
    });

    if (!doc) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(doc);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch doc" },
      { status: 500 }
    );
  }
}