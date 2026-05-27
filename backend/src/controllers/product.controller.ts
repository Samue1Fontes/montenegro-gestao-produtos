import { Request, Response } from 'express';
import { productService } from '../services/product.service';

// Retorna todos os produtos
async function getAll(req: Request, res: Response): Promise<void> {
  try {
    const products = await productService.getAll();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar produtos' });
  }
}

// Retorna um produto pelo ID
async function getById(req: Request, res: Response): Promise<void> {
  try {
    const id = req.params['id'] as string;
    const product = await productService.getById(id);
    res.status(200).json(product);
  } catch (error) {
    // O service lança erro com mensagem clara quando não encontra
    res.status(404).json({ message: (error as Error).message });
  }
}

// Cria um novo produto
async function create(req: Request, res: Response): Promise<void> {
  try {
    const product = await productService.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    // Erros de validação vêm do service com mensagem descritiva
    res.status(400).json({ message: (error as Error).message });
  }
}

// Atualiza um produto existente
async function update(req: Request, res: Response): Promise<void> {
  try {
    const id = req.params['id'] as string;
    const product = await productService.update(id, req.body);
    res.status(200).json(product);
  } catch (error) {
    const message = (error as Error).message;

    // Distingue erro de "não encontrado" de erro de validação
    if (message === 'Produto não encontrado') {
      res.status(404).json({ message });
    } else {
      res.status(400).json({ message });
    }
  }
}

// Remove um produto pelo ID
async function remove(req: Request, res: Response): Promise<void> {
  try {
    const id = req.params['id'] as string;
    await productService.remove(id);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ message: (error as Error).message });
  }
}

export const productController = {
  getAll,
  getById,
  create,
  update,
  remove,
};