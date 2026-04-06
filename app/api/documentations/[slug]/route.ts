import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;

    const doc = await prisma.documentation.findUnique({
      where: { slug },
      include: { images: true },
    });

    if (!doc) {
      return NextResponse.json(
        { error: "Documentation not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(doc);
  } catch (error) {
    console.error("GET DOCUMENTATION ERROR:", error);

    return NextResponse.json(
      { error: "Failed to fetch documentation" },
      { status: 500 }
    );
  }
}