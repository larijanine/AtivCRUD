import { Router } from 'express';
import {
  listarProdutos,
  inserirProduto,
  atualizarProduto,
  deletarProduto
} from '../controllers/produtoController';
import { verificarToken } from '../middlewares/auth';

const router = Router();

router.get('/', verificarToken, listarProdutos);
router.post('/', verificarToken, inserirProduto);
router.put('/:id', verificarToken, atualizarProduto);
router.delete('/:id', verificarToken, deletarProduto);

export default router;
