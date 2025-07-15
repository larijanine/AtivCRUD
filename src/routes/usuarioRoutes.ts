import { Router } from 'express';
import { login, listarUsuarios } from '../controllers/usuarioController';
import { verificarToken } from '../middlewares/auth';

const router = Router();

router.post('/login', login);
router.get('/', verificarToken, listarUsuarios);

export default router;
