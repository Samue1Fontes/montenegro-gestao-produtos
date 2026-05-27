import { useRef } from 'react';
import Navbar from './components/Navbar';
import HomeSection from './pages/HomeSection';
import ProductsSection, { type ProductsSectionRef } from './pages/ProductsSection';
import AboutSection from './pages/AboutSection';

function App() {
  // Ref para acessar a função openCreate da ProductsSection
  const productsSectionRef = useRef<ProductsSectionRef>(null);

  function navigateToProducts() {
    const element = document.getElementById('produtos');
    element?.scrollIntoView({ behavior: 'smooth' });
  }

  // Scroll até produtos e abre o modal após o scroll terminar
  function navigateAndCreate() {
    const element = document.getElementById('produtos');
    element?.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
      productsSectionRef.current?.openCreate();
    }, 600);
  }

  return (
    <div className="font-sans text-gray-900">
      <Navbar />
      <main>
        <HomeSection
          onNavigateToProducts={navigateToProducts}
          onCreateProduct={navigateAndCreate}
        />
        <ProductsSection ref={productsSectionRef} />
        <AboutSection />
      </main>
      <footer className="bg-white border-t border-gray-100 py-6 text-center text-sm text-gray-400">
        © 2026 Montenegro Gestão de Produtos — Desenvolvido por&nbsp;
        <a href="https://github.com/Samue1Fontes" target="_blank" rel="noopener noreferrer">
          Samuel Fontes da Silva
        </a>
      </footer>
    </div>
  );
}

export default App;