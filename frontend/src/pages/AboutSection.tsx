function AboutSection() {
  return (
    <section
      id="sobre"
      className="min-h-screen flex items-center justify-center bg-gray-50"
    >
      <div className="text-center px-6 max-w-xl">

        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Sobre o Projeto
        </h2>

        <p className="text-gray-500 text-base mb-6 leading-relaxed">
          Aplicação desenvolvida como desafio técnico para a vaga de
          Desenvolvedor Full Stack Júnior. O objetivo é demonstrar
          conhecimento prático no desenvolvimento de uma aplicação
          completa de ponta a ponta.
        </p>

        <div className="bg-white border border-gray-200 rounded-xl p-6 text-left mb-6">
          <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
            Tecnologias utilizadas
          </h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>⚡ React + Vite + TypeScript</li>
            <li>🎨 TailwindCSS</li>
            <li>🔗 Axios</li>
            <li>🟢 Node.js + Express + TypeScript</li>
            <li>💾 Persistência em arquivo JSON</li>
          </ul>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6 text-left">
          <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
            Desenvolvedor
          </h3>
          <p className="text-sm text-gray-600 mb-3">Samuel Fontes da Silva</p>
          <div className="flex gap-3">
            <a
              href="https://github.com/Samue1Fontes"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-500 hover:underline"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/samuelfontes2003/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-500 hover:underline"
            >
              LinkedIn
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}

export default AboutSection;