import express from 'express';
import cors from 'cors';
import usuarioRoutes from './routes/usuarioRoutes';
import produtoRoutes from './routes/produtoRoutes';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/usuarios', usuarioRoutes);
app.use('/produtos', produtoRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
