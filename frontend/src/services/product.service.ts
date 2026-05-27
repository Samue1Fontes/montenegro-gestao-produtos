import axios from 'axios';
import type { Product, CreateProductDTO, UpdateProductDTO } from '../types/product.types';

// Em desenvolvimento local usa localhost
// Em produção com Docker usa a variável de ambiente
// URL base da API — aponta para o backend rodando localmente
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3333/products';

// Busca todos os produtos
async function getAll(): Promise<Product[]> {
  const response = await axios.get<Product[]>(API_URL);
  return response.data;
}

// Busca um produto pelo ID
async function getById(id: string): Promise<Product> {
  const response = await axios.get<Product>(`${API_URL}/${id}`);
  return response.data;
}

// Cria um novo produto
async function create(data: CreateProductDTO): Promise<Product> {
  const response = await axios.post<Product>(API_URL, data);
  return response.data;
}

// Atualiza um produto existente
async function update(id: string, data: UpdateProductDTO): Promise<Product> {
  const response = await axios.put<Product>(`${API_URL}/${id}`, data);
  return response.data;
}

// Remove um produto pelo ID
async function remove(id: string): Promise<void> {
  await axios.delete(`${API_URL}/${id}`);
}

export const productService = {
  getAll,
  getById,
  create,
  update,
  remove,
};