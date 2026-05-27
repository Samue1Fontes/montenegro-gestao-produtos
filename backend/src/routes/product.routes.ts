import { Router } from 'express';
import { productController } from '../controllers/product.controller';

const router = Router();

// GET /products — lista todos os produtos
router.get('/', productController.getAll);

// GET /products/:id — busca um produto pelo ID
router.get('/:id', productController.getById);

// POST /products — cria um novo produto
router.post('/', productController.create);

// PUT /products/:id — atualiza um produto existente
router.put('/:id', productController.update);

// DELETE /products/:id — remove um produto
router.delete('/:id', productController.remove);

export default router;