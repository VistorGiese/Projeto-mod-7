import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";

export interface AuthRequest extends Request {
  user?: { id: number; email?: string };
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ error: "Acesso Negado, Token Inexistente" });
  }

  try {
    const decoded: any = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ error: "Token inválido" });
    }
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Token inválido" });
  }
};