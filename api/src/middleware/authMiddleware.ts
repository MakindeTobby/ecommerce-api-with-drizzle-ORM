import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { de } from "zod/v4/locales/index.cjs";

export function verifyToken(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.header("authorization");
  if (!authHeader) {
    return response.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return response.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    request.userId = (decoded as { userId: number }).userId;
    request.role = (decoded as { role: string }).role;
    next();
  } catch (error) {
    return response.status(401).json({ error: "Access denied" });
  }
}
export function verifySeller(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const role = request.role;
  if (role !== "seller") {
    return response.status(403).json({ error: "You are not a seller" });
  }
  next();
}
