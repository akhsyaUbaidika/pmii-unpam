import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    // ✅ Validasi input
    if (!username || !password) {
      return Response.json({ error: "Missing credentials" }, { status: 400 });
    }

    const user = await prisma.admin.findUnique({
      where: { username },
    });

    if (!user) {
      return Response.json({ error: "User not found" }, { status: 401 });
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return Response.json({ error: "Wrong password" }, { status: 401 });
    }

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    return Response.json({
      token,
      user: {
        id: user.id,
        username: user.username,
      },
    });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
