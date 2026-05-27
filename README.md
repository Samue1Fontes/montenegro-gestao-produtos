<div align="center">

# 🗂️ Montenegro Gestão de Produtos

Sistema de gerenciamento de produtos desenvolvido como desafio técnico para a vaga de **Desenvolvedor Full Stack Júnior**.

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

</div>

---

## 📋 Sobre o Projeto

Aplicação fullstack completa para gerenciamento de produtos com operações de **criação, listagem, edição e remoção** (CRUD), desenvolvida de ponta a ponta com React, Node.js e TypeScript.

---

## 🚀 Tecnologias Utilizadas

### Backend
| Tecnologia | Descrição |
|---|---|
| Node.js | Plataforma de execução JavaScript |
| Express | Framework HTTP para criação da API REST |
| TypeScript | Tipagem estática para maior segurança e clareza |
| fs/promises | Leitura e escrita assíncrona no arquivo JSON |

### Frontend
| Tecnologia | Descrição |
|---|---|
| React | Biblioteca para construção de interfaces |
| Vite | Bundler moderno e performático |
| TypeScript | Tipagem estática nos componentes e services |
| TailwindCSS | Framework CSS utilitário |
| Axios | Cliente HTTP para consumo da API |

### Infraestrutura
| Tecnologia | Descrição |
|---|---|
| Docker | Containerização da aplicação |
| Docker Compose | Orquestração dos containers |


---

## ⚙️ Como Instalar

### Pré-requisitos

Com Docker:
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalado e rodando

Sem Docker:
- [Node.js](https://nodejs.org/) versão 18 ou superior
- npm versão 9 ou superior

### Clonando o repositório

```bash
git clone https://github.com/seu-usuario/montenegro-gestao-produtos.git

cd montenegro-gestao-produtos
```

---

## 🐳 Como Rodar com Docker (recomendado)

Na raiz do projeto, execute:

```bash
docker compose up --build
```

Aguarde o build finalizar. 

Você verá:
```bash
mgp-backend  | Servidor rodando em http://localhost:3333
mgp-frontend | Accepting connections at http://localhost:5173
```

Acesse a aplicação em:
```bash
http://localhost:5173
```

### Parar os containers

```bash
docker compose down
```

### Subir novamente (sem rebuild)

```bash
docker compose up
```

> ✅ Os dados do `products.json` são persistidos via volume Docker e **não são perdidos** ao reiniciar os containers.

---

## ▶️ Como Rodar sem Docker

### Backend

```bash
cd backend
npm install
npm run dev
```

O servidor estará disponível em:
```bash
http://localhost:3333
```

Verifique se está rodando:
```bash
http://localhost:3333/health
```
Resposta esperada:

```json
{ "status": "ok", "message": "Servidor rodando!" }
```

### Frontend

Em outro terminal:

```bash
cd frontend
npm install
npm run dev
```

A aplicação estará disponível em:
```bash
http://localhost:5173
```

> ⚠️ O backend precisa estar rodando antes de acessar o frontend.

---

## 🌐 Como Acessar a Aplicação

Com a aplicação rodando, acesse `http://localhost:5173`.

A aplicação possui três seções:

| Seção | Descrição |
|---|---|
| **Início** | Apresentação do sistema com acesso rápido |
| **Produtos** | Listagem, pesquisa, criação, edição e remoção |
| **Sobre** | Informações do projeto e do desenvolvedor |

---

## 📡 Rotas da API

Base URL: `http://localhost:3333`

| Método | Rota | Descrição | Status |
|---|---|---|---|
| `GET` | `/health` | Verifica se o servidor está rodando | `200` |
| `GET` | `/products` | Lista todos os produtos | `200` |
| `GET` | `/products/:id` | Busca um produto pelo ID | `200` |
| `POST` | `/products` | Cria um novo produto | `201` |
| `PUT` | `/products/:id` | Atualiza um produto existente | `200` |
| `DELETE` | `/products/:id` | Remove um produto | `204` |

### Estrutura do Produto

```json
{
  "id": "1700000000001",
  "name": "Notebook Dell Inspiron",
  "description": "Notebook com processador Intel Core i5, 8GB RAM e SSD 256GB",
  "price": 3299.90,
  "category": "Eletrônicos",
  "active": true,
  "createdAt": "2024-01-15T10:00:00.000Z"
}
```

### Exemplos de requisição

**POST /products — Criar produto**
```json
{
  "name": "Mouse Logitech",
  "description": "Mouse sem fio ergonômico",
  "price": 199.90,
  "category": "Periféricos",
  "active": true
}
```

**PUT /products/:id — Atualizar produto**
```json
{
  "price": 179.90,
  "active": false
}
```
---

## 📦 Persistência de Dados

Os dados são persistidos em:
backend/src/data/products.json

Não é necessário banco de dados real. O arquivo é lido e atualizado a cada operação de criação, edição ou remoção. Com Docker, um volume garante que os dados não sejam perdidos ao reiniciar os containers.

---

## 📁 Arquitetura do Projeto

```bash
montenegro-gestao-produtos/
├── backend/
│   ├── src/
│   │   ├── routes/           # Definição das rotas HTTP
│   │   ├── controllers/      # Recebe requisições e devolve respostas
│   │   ├── services/         # Regras de negócio e validações
│   │   ├── repositories/     # Leitura e escrita no arquivo JSON
│   │   ├── types/            # Tipagens TypeScript
│   │   ├── data/
│   │   │   └── products.json # Persistência dos dados
│   │   ├── app.ts            # Configuração do Express
│   │   └── server.ts         # Inicialização do servidor
│   ├── Dockerfile
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── components/       # Componentes reutilizáveis
│   │   ├── pages/            # Seções da aplicação
│   │   ├── services/         # Chamadas HTTP com Axios
│   │   ├── types/            # Tipagens TypeScript
│   │   └── App.tsx
│   ├── Dockerfile
│   ├── package.json
│   └── vite.config.ts
│
├── docker-compose.yml
└── README.md
```
### Fluxo

```bash
Frontend (React + Axios)
↓ HTTP Request
Backend (Express)
↓
Routes          → mapeia URL e método HTTP
↓
Controller       → recebe req, chama service, devolve res
↓
Service         → valida dados e aplica regras de negócio
↓
Repository        → lê e escreve no products.json
↓
products.json      → persistência dos dados
```

---

## 📝 Observações

**Persistência:** Os dados são armazenados em `backend/src/data/products.json`. Não foi utilizado banco de dados real — o arquivo JSON é suficiente para demonstrar o fluxo completo da aplicação. A camada de repository abstrai o acesso aos dados, o que significa que trocar o JSON por um banco real exigiria alterações apenas nessa camada.

**Docker:** O projeto possui suporte completo a Docker. Com um único comando `docker compose up --build` toda a aplicação sobe sem necessidade de configuração adicional. Um volume garante que os dados do `products.json` não sejam perdidos ao reiniciar os containers.

**Arquitetura em camadas:** A separação entre Controller, Service e Repository foi uma decisão consciente para demonstrar organização e boas práticas. Cada camada possui responsabilidade única, tornando o código mais fácil de manter, evoluir e explicar.

**SPA sem React Router:** Para o escopo do projeto, uma única página com scroll suave entre seções reduz complexidade desnecessária e entrega uma experiência de navegação fluída sem precisar de bibliotecas adicionais.

**Axios:** Escolhido em vez do fetch nativo por simplificar o tratamento de erros e a tipagem das respostas HTTP, tornando o código do frontend mais legível e previsível.

**Uso de Inteligência Artificial:** Durante o desenvolvimento, utilizei ferramentas de inteligência artificial como Claude, ChatGPT e Gemini como apoio à produtividade, estruturação do projeto, organização da arquitetura e auxílio na construção do código. As ferramentas foram utilizadas como suporte durante o processo de desenvolvimento e aprendizado da aplicação.

---

## 👨‍💻 Desenvolvedor

**Samuel Fontes da Silva**

[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/samue1fontes/)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/samuelfontes2003/)
[![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/samuel_fontesgtr/)

### 🙏 Agradecimentos

Gostaria de agradecer à **Montenegro Hub** pela oportunidade de participar deste desafio técnico e poder demonstrar um pouco do meu conhecimento e dedicação ao desenvolvimento de software.

Agradeço também à minha **família**, à minha noiva **Juliane**, que esteve ao meu lado durante todo o processo, e principalmente a **Deus**, pela oportunidade de continuar buscando crescimento profissional e recolocação no mercado de tecnologia.

Como profissional em início de carreira, este projeto representa não apenas um desafio técnico, mas também uma oportunidade importante de evolução e aprendizado.