type Props = {
  onNavigateToProducts: () => void;
  onCreateProduct: () => void;
};

function HomeSection({ onNavigateToProducts, onCreateProduct }: Props) {
  return (
    <section
      id="inicio"
      className="min-h-screen flex items-center justify-center bg-gray-50"
    >
      <div className="text-center px-6 max-w-2xl">

        <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-6">
          Desafio Técnico — Full Stack Júnior
        </span>

        <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
          Montenegro Gestão de Produtos
        </h1>

        <p className="text-gray-500 text-lg mb-8">
          Sistema simples para gerenciamento de produtos,
          desenvolvido com React, Node.js e TypeScript.
        </p>

        <div className="flex gap-4 justify-center flex-wrap">
          <button
            onClick={onCreateProduct}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-3 rounded-lg transition-colors"
          >
            + Criar Produto
          </button>
          <button
            onClick={onNavigateToProducts}
            className="bg-white hover:bg-gray-100 text-gray-700 font-medium px-6 py-3 rounded-lg border border-gray-200 transition-colors"
          >
            Ver Produtos
          </button>
        </div>

      </div>
    </section>
  );
}

export default HomeSection;