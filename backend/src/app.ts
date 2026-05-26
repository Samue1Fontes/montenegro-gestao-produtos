import express from 'express';
import cors from 'cors';

const app = express();

// Middlewares globais
app.use(cors());
app.use(express.json());

// Rota de verificação de saúde do servidor
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Servidor rodando!' });
});

export default app;