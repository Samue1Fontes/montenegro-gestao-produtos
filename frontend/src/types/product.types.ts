// Representa um produto completo — retornado pela API
export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  active: boolean;
  createdAt: string;
};

// Dados enviados para criar um produto — sem id e createdAt
export type CreateProductDTO = Omit<Product, 'id' | 'createdAt'>;

// Dados enviados para editar — todos os campos são opcionais
export type UpdateProductDTO = Partial<CreateProductDTO>;