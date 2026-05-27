import { useState, useEffect, useImperativeHandle, forwardRef, useRef } from 'react';
import type { Product, CreateProductDTO } from '../types/product.types';
import { productService } from '../services/product.service';
import ProductTable from '../components/ProductTable';
import ProductModal from '../components/ProductModal';
import FeedbackMessage from '../components/FeedbackMessage';

export type ProductsSectionRef = {
  openCreate: () => void;
};

type FeedbackState = {
  type: 'success' | 'error' | 'loading' | 'info';
  message: string;
};

const ProductsSection = forwardRef<ProductsSectionRef>((_, ref) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<FeedbackState | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Ref para controlar o timer do toast — evita múltiplos timers simultâneos
  const feedbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useImperativeHandle(ref, () => ({
    openCreate: handleOpenCreate,
  }));

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const term = search.toLowerCase();
    return (
      product.name.toLowerCase().includes(term) ||
      product.category.toLowerCase().includes(term)
    );
  });

  // Cancela o timer anterior antes de criar um novo — evita bugs com cliques rápidos
  function showFeedback(type: FeedbackState['type'], message: string) {
    if (feedbackTimerRef.current) {
      clearTimeout(feedbackTimerRef.current);
    }

    setFeedback({ type, message });

    // Loading não some automaticamente — some quando a operação termina
    if (type !== 'loading') {
      feedbackTimerRef.current = setTimeout(() => {
        setFeedback(null);
      }, 3000);
    }
  }

  async function fetchProducts() {
    try {
      setLoading(true);
      const data = await productService.getAll();
      setProducts(data);
    } catch {
      showFeedback('error', 'Erro ao carregar produtos. Verifique se o backend está rodando.');
    } finally {
      setLoading(false);
    }
  }

  function handleOpenCreate() {
    setSelectedProduct(null);
    setIsModalOpen(true);
  }

  function handleOpenEdit(product: Product) {
    setSelectedProduct(product);
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setSelectedProduct(null);
    setIsModalOpen(false);
    showFeedback('info', 'Operação cancelada.');
  }

  async function handleSave(data: CreateProductDTO) {
    try {
      showFeedback('loading', 'Salvando produto...');

      if (selectedProduct) {
        // Promise.all garante que o loading apareça por pelo menos 800ms
        await Promise.all([
          productService.update(selectedProduct.id, data),
          new Promise(resolve => setTimeout(resolve, 800)),
        ]);
        showFeedback('success', 'Produto atualizado com sucesso!');
      } else {
        await Promise.all([
          productService.create(data),
          new Promise(resolve => setTimeout(resolve, 800)),
        ]);
        showFeedback('success', 'Produto criado com sucesso!');
      }

      setIsModalOpen(false);
      setSelectedProduct(null);
      fetchProducts();
    } catch {
      showFeedback('error', 'Erro ao salvar produto. Tente novamente.');
    }
  }

  async function handleDelete(id: string) {
    const confirmed = window.confirm('Tem certeza que deseja excluir este produto?');

    if (!confirmed) {
      showFeedback('info', 'Exclusão cancelada.');
      return;
    }

    try {
      setDeletingId(id);
      showFeedback('loading', 'Removendo produto...');

      // Promise.all garante que o loading apareça por pelo menos 800ms
      await Promise.all([
        productService.remove(id),
        new Promise(resolve => setTimeout(resolve, 800)),
      ]);

      showFeedback('success', 'Produto removido com sucesso!');
      fetchProducts();
    } catch {
      showFeedback('error', 'Erro ao remover produto. Tente novamente.');
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <section id="produtos" className="min-h-screen bg-white py-24 px-6">
      <div className="max-w-5xl mx-auto">

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Produtos</h2>
          <button
            onClick={handleOpenCreate}
            className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            + Novo Produto
          </button>
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Pesquisar por nome ou categoria..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {loading && (
          <p className="text-center text-gray-400 py-10">Carregando produtos...</p>
        )}

        {!loading && (
          <ProductTable
            products={filteredProducts}
            deletingId={deletingId}
            onEdit={handleOpenEdit}
            onDelete={handleDelete}
          />
        )}

      </div>

      {feedback && (
        <FeedbackMessage type={feedback.type} message={feedback.message} />
      )}

      {isModalOpen && (
        <ProductModal
          product={selectedProduct}
          onSave={handleSave}
          onClose={handleCloseModal}
        />
      )}

    </section>
  );
});

export default ProductsSection;