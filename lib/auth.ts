import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

type JwtPayload = {
  id: string;
};

export function verifyToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch (error) {
    console.error("JWT Error:", error);
    return null;
  }
}

export function getTokenFromHeader(req: Request): string | null {
  const authHeader = req.headers.get("authorization");

  if (!authHeader) return null;

  if (!authHeader.startsWith("Bearer ")) return null;

  const token = authHeader.split(" ")[1];

  return token || null;
}