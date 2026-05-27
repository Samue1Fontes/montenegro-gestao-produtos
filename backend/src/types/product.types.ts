// Representa um produto completo — usado no repository, service e controller
export type Product = {
  id: string;          // gerado com Date.now().toString()
  name: string;        // nome do produto
  description: string; // descrição do produto
  price: number;       // preço em número (ex: 29.90)
  category: string;    // categoria (ex: "Eletrônicos")
  active: boolean;     // se o produto está ativo ou inativo
  createdAt: string;   // data de criação em ISO string
};

// Usado no POST — o frontend envia esses campos, o backend gera id e createdAt
export type CreateProductDTO = Omit<Product, 'id' | 'createdAt'>;

// Usado no PUT — todos os campos editáveis são opcionais
export type UpdateProductDTO = Partial<CreateProductDTO>;