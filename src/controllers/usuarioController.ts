// src/controllers/usuarioController.ts
//------------------------------------------------------------
// Controller de Usuário
// - login: autenticação JWT com senha criptografada (bcrypt)
// - listarUsuarios: apenas exemplo de listagem protegida
//------------------------------------------------------------

import { Request, Response } from 'express';
import { PrismaClient } from '../../generated/prisma';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'; // >>> importa bcrypt

const prisma = new PrismaClient();

/**
 * POST /usuarios/login
 * Body: { username, password }
 */
export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  // 1. Busca usuário pelo username
  const usuario = await prisma.usuario.findUnique({ where: { username } });

  // 2. Valida existência
  if (!usuario) {
    return res.status(401).json({ mensagem: 'Usuário ou senha inválidos' });
  }

  // 3. Compara senha digitada (plain) com hash salvo
  const ok = await bcrypt.compare(password, usuario.password);
  if (!ok) {
    return res.status(401).json({ mensagem: 'Usuário ou senha inválidos' });
  }

  // 4. Gera JWT válido por 1h
  const token = jwt.sign(
    { username: usuario.username, tipo: usuario.tipo },
    process.env.JWT_SECRET!,        // chave secreta no .env
    { expiresIn: '1h' }
  );

  return res.json({ token });
};

/**
 * GET /usuarios
 * Exemplo de rota protegida que lista todos os usuários
 */
export const listarUsuarios = async (_: Request, res: Response) => {
  const usuarios = await prisma.usuario.findMany();
  res.json(usuarios);
};
