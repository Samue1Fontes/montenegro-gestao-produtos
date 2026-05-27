function Navbar() {
  // Faz scroll suave até a seção pelo ID do elemento
  function scrollToSection(id: string) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo / Nome do sistema */}
        <span className="text-lg font-bold text-gray-800">
          MGP
        </span>

        {/* Links de navegação */}
        <div className="flex gap-6">
          <button
            onClick={() => scrollToSection('inicio')}
            className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium"
          >
            Início
          </button>
          <button
            onClick={() => scrollToSection('produtos')}
            className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium"
          >
            Produtos
          </button>
          <button
            onClick={() => scrollToSection('sobre')}
            className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium"
          >
            Sobre
          </button>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;