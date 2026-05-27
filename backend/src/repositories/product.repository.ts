import fs from 'fs/promises';
import path from 'path';
import { Product } from '../types/product.types';

// Caminho absoluto para o arquivo JSON
// path.join garante que funciona em qualquer sistema operacional
const DATA_FILE = path.join(__dirname, '../data/products.json');

// Lê o arquivo JSON e retorna a lista de produtos
async function readProducts(): Promise<Product[]> {
  const fileContent = await fs.readFile(DATA_FILE, 'utf-8');
  return JSON.parse(fileContent) as Product[];
}

// Salva a lista de produtos no arquivo JSON
// JSON.stringify(data, null, 2) formata o JSON com indentação legível
async function writeProducts(products: Product[]): Promise<void> {
  await fs.writeFile(DATA_FILE, JSON.stringify(products, null, 2), 'utf-8');
}

// Retorna todos os produtos
async function getAll(): Promise<Product[]> {
  return await readProducts();
}

// Busca um produto pelo ID
// Retorna o produto encontrado ou undefined se não existir
async function getById(id: string): Promise<Product | undefined> {
  const products = await readProducts();
  return products.find((product) => product.id === id);
}

// Recebe um produto já completo e adiciona na lista
async function create(newProduct: Product): Promise<Product> {
  const products = await readProducts();
  products.push(newProduct);
  await writeProducts(products);
  return newProduct;
}

// Atualiza os campos de um produto existente pelo ID
// Retorna o produto atualizado ou undefined se não encontrar
async function update(id: string, updatedData: Partial<Product>): Promise<Product | undefined> {
  const products = await readProducts();

  // Encontra o índice do produto na lista
  const index = products.findIndex((product) => product.id === id);

  // Se não encontrou, retorna undefined — o service vai tratar esse caso
  if (index === -1) return undefined;

  // Mescla os dados antigos com os novos usando spread operator
  products[index] = { ...products[index], ...updatedData };

  await writeProducts(products);
  return products[index];
}

// Remove um produto pelo ID
// Retorna true se removeu, false se não encontrou
async function remove(id: string): Promise<boolean> {
  const products = await readProducts();

  const filteredProducts = products.filter((product) => product.id !== id);

  // Se o tamanho não mudou, o produto não existia
  if (filteredProducts.length === products.length) return false;

  await writeProducts(filteredProducts);
  return true;
}

export const productRepository = {
  getAll,
  getById,
  create,
  update,
  remove,
};