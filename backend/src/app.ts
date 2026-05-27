import express from 'express';
import cors from 'cors';
import productRoutes from './routes/product.routes';

const app = express();

// Middlewares globais
app.use(cors());
app.use(express.json());

// Rota de verificação de saúde do servidor
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Servidor rodando!' });
});

// Rotas do CRUD de produtos
// Tudo que chegar em /products será tratado pelo productRoutes
app.use('/products', productRoutes);

export default app;