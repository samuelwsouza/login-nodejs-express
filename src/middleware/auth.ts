import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

declare module "express" {
  export interface Request {
    userId?: string;
  }
}

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET não está definido!");
}

const auth = (
  req: Request,
  res: Response,
  next: NextFunction
): Response<void> | any => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Acesso negado!" });
  }

  try {
    const decoded = jwt.verify(
      token.replace("Bearer ", ""),
      JWT_SECRET
    ) as JwtPayload;
    // console.log(decoded);

    req.userId = decoded.id;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido!" });
  }
};

export default auth;
