import { Request, Response } from 'express';
import { PrismaClient } from '../../generated/prisma';

const prisma = new PrismaClient();

export const listarProdutos = async (_: Request, res: Response) => {
  const produtos = await prisma.produto.findMany();
  res.json(produtos);
};

export const inserirProduto = async (req: Request, res: Response) => {
  const { nome, preco } = req.body;
  const produto = await prisma.produto.create({ data: { nome, preco } });
  res.status(201).json(produto);
};

export const atualizarProduto = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { nome, preco } = req.body;

  const produto = await prisma.produto.update({
    where: { id },
    data: { nome, preco }
  });

  res.json(produto);
};

export const deletarProduto = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  await prisma.produto.delete({ where: { id } });
  res.status(204).send();
};
