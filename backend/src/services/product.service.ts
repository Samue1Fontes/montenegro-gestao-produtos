import { productRepository } from '../repositories/product.repository';
import { Product, CreateProductDTO, UpdateProductDTO } from '../types/product.types';

// Retorna todos os produtos
async function getAll(): Promise<Product[]> {
  return await productRepository.getAll();
}

// Busca um produto pelo ID
// Lança um erro se não encontrar — o controller vai capturar
async function getById(id: string): Promise<Product> {
  const product = await productRepository.getById(id);

  if (!product) {
    throw new Error('Produto não encontrado');
  }

  return product;
}

// Valida os dados e cria um novo produto
async function create(data: CreateProductDTO): Promise<Product> {
  // Validação básica dos campos obrigatórios
  if (!data.name || data.name.trim() === '') {
    throw new Error('O nome do produto é obrigatório');
  }

  if (!data.description || data.description.trim() === '') {
    throw new Error('A descrição do produto é obrigatória');
  }

  if (data.price === undefined || data.price === null) {
    throw new Error('O preço do produto é obrigatório');
  }

  if (typeof data.price !== 'number' || data.price < 0) {
    throw new Error('O preço deve ser um número maior ou igual a zero');
  }

  if (!data.category || data.category.trim() === '') {
    throw new Error('A categoria do produto é obrigatória');
  }

  // Monta o objeto completo — o frontend só envia os campos do DTO
  const newProduct: Product = {
    id: Date.now().toString(),
    name: data.name.trim(),
    description: data.description.trim(),
    price: data.price,
    category: data.category.trim(),
    active: data.active ?? true, // se não informado, começa como ativo
    createdAt: new Date().toISOString(),
  };

  return await productRepository.create(newProduct);
}

// Valida e atualiza um produto existente
async function update(id: string, data: UpdateProductDTO): Promise<Product> {
  // Verifica se o produto existe antes de tentar atualizar
  const existingProduct = await productRepository.getById(id);

  if (!existingProduct) {
    throw new Error('Produto não encontrado');
  }

  // Valida os campos que foram enviados
  if (data.name !== undefined && data.name.trim() === '') {
    throw new Error('O nome do produto não pode ser vazio');
  }

  if (data.description !== undefined && data.description.trim() === '') {
    throw new Error('A descrição do produto não pode ser vazia');
  }

  if (data.price !== undefined && (typeof data.price !== 'number' || data.price < 0)) {
    throw new Error('O preço deve ser um número maior ou igual a zero');
  }

  if (data.category !== undefined && data.category.trim() === '') {
    throw new Error('A categoria do produto não pode ser vazia');
  }

  const updatedProduct = await productRepository.update(id, data);

  // Esse caso não deve acontecer, mas o TypeScript exige a verificação
  if (!updatedProduct) {
    throw new Error('Erro ao atualizar o produto');
  }

  return updatedProduct;
}

// Remove um produto pelo ID
async function remove(id: string): Promise<void> {
  const removed = await productRepository.remove(id);

  if (!removed) {
    throw new Error('Produto não encontrado');
  }
}

export const productService = {
  getAll,
  getById,
  create,
  update,
  remove,
};