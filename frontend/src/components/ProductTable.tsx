import type { Product } from '../types/product.types';

type Props = {
  products: Product[];
  deletingId: string | null;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
};

function ProductTable({ products, deletingId, onEdit, onDelete }: Props) {
  if (products.length === 0) {
    return (
      <p className="text-center text-gray-500 py-10">
        Nenhum produto encontrado.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
          <tr>
            <th className="px-4 py-3">Nome</th>
            <th className="px-4 py-3">Categoria</th>
            <th className="px-4 py-3">Preço</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {products.map((product) => (
            <tr key={product.id} className="bg-white hover:bg-gray-50 transition-colors">
              <td className="px-4 py-3 font-medium text-gray-800">{product.name}</td>
              <td className="px-4 py-3 text-gray-600">{product.category}</td>
              <td className="px-4 py-3 text-gray-600">
                {product.price.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </td>
              <td className="px-4 py-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  product.active
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}>
                  {product.active ? 'Ativo' : 'Inativo'}
                </span>
              </td>
              <td className="px-4 py-3 flex gap-2">
                <button
                  onClick={() => onEdit(product)}
                  className="px-3 py-1 text-xs font-medium text-white bg-blue-500 hover:bg-blue-600 rounded transition-colors"
                >
                  Editar
                </button>
                <button
                  onClick={() => onDelete(product.id)}
                  disabled={deletingId === product.id}
                  className="px-3 py-1 text-xs font-medium text-white bg-red-500 hover:bg-red-600 disabled:opacity-60 rounded transition-colors"
                >
                  {deletingId === product.id ? 'Excluindo...' : 'Excluir'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;