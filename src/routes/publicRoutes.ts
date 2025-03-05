import { Request, Response, Router } from "express";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

const router = Router();

const JWT_SECRET = process.env.JWT_SECRET;

router.post("/cadastro", async (req: Request, res: Response) => {
  try {
    const user = req.body;

    const salt = await bcrypt.genSalt(10);
    console.log("Recebido:", user);
    const hashPassword = await bcrypt.hash(user.password, salt);

    const userDB = await prisma.user.create({
      data: {
        email: user.email,
        name: user.name,
        password: hashPassword,
      },
    });

    res.status(201).json(userDB);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Não foi possível cadastrar-se, tente novamente" });
  }
});

router.post("/login", async (req: Request, res: Response): Promise<any> => {
  try {
    const userInfo = req.body;

    const user = await prisma.user.findUnique({
      where: { email: userInfo.email },
    });

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    const isMatch = await bcrypt.compare(userInfo.password, user.password);

    if (!isMatch) {
      return res.status(404).json({ message: "A senha não é a mesma" });
    }

    const JWT_SECRET = process.env.JWT_SECRET || "chave-padrao-segura"; // verificacao pra n dar erro no JWT_SECRET
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json(token);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Não foi possível cadastrar-se, tente novamente" });
  }
});

export default router;
