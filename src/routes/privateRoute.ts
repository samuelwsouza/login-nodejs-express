import { Request, Response, Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.get("/listar-usuarios", async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json({ message: "Usuários listados com sucesso!", users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Falha no servidor" });
  }
});

export default router;
