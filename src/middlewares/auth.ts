import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const auth = (
  req: Request & { user?: any },
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "missing auth" });
  const parts = authHeader.split(" ");
  if (parts.length !== 2) return res.status(401).json({ error: "malformed" });
  const token = parts[1];

  if (token === "null" || token === "undefined") {
    return res.status(401).json({ error: "invalid token" });
  }
  try {
    const decoded: any = jwt.verify(token!, process.env.JWT_SECRET!);
    req.user = { id: decoded.id };
    next();
  } catch (err) {
    return res.status(401).json({ error: "invalid token" });
  }
};
